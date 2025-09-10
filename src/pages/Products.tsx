import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProductModal } from "@/components/modals/ProductModal";
import { Product, Category } from "@/data/mockData";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { getCategories } from "../services/categoryService";

export default function Products() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ----- React Query: Categories -----
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // ----- React Query: Products -----
  const { data: products = [], isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // ----- Mutations -----
  const createMutation = useMutation({
    mutationFn: (newProduct: Product) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }: { id: string; product: Product }) =>
      updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // ----- Handlers -----
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSaveProduct = (productData: Omit<Product, "_id" | "createdAt">) => {
    // Si aucune catégorie définie, assigner "aucune catégorie"
    if (!productData.category) {
      productData.category = "aucune_categorie"; // ID fictif pour la catégorie par défaut
    }

    if (selectedProduct) {
      updateMutation.mutate({ id: selectedProduct._id!, product: productData });
    } else {
      createMutation.mutate(productData);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ----- Helper pour nom de catégorie -----
  const getCategoryName = (cat: Category | string | null) => {
    if (!cat) return "Aucune catégorie";

    // Si cat est une chaîne (id fictif par défaut)
    if (typeof cat === "string") {
      return cat === "aucune_categorie" ? "Aucune catégorie" : "Catégorie inconnue";
    }

    for (const category of categories) {
      if (category._id === cat._id) return category.name;
      if (category.subCategories) {
        for (const sub of category.subCategories) {
          if (sub._id === cat._id) return `${category.name} > ${sub.name}`;
        }
      }
    }
    return "Aucune catégorie";
  };

  const getStatusBadge = (status: string) =>
    status === "active" ? (
      <Badge className="bg-success text-success-foreground">Actif</Badge>
    ) : (
      <Badge variant="secondary">Inactif</Badge>
    );

  // ----- Render -----
  if (isLoading) return <p className="text-center text-muted-foreground">Chargement des produits...</p>;
  if (isError) return <p className="text-center text-destructive">Erreur: {(error as Error).message}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produits</h1>
          <p className="text-muted-foreground mt-2">Gérez votre catalogue de produits</p>
        </div>
        <Button onClick={handleAddProduct} className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Tous les produits</CardTitle>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Aucun produit disponible</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Marque</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="font-medium">{product.brand}</TableCell>
                    <TableCell>{getCategoryName(product.category)}</TableCell>
                    <TableCell>{product.price?.toFixed(2)} dt</TableCell>
                    <TableCell>
                      <span className={product.stock < 50 ? "text-warning font-medium" : ""}>{product.stock}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.statusProduct)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product._id!)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        categories={categories}
      />
    </div>
  );
}
