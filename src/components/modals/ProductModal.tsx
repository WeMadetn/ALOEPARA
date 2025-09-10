import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Product, type Category } from "@/data/mockData";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, "_id" | "createdAt">) => void;
  product: Product | null;
  categories: Category[];
}

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
  categories,
}: ProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, "_id" | "createdAt">>({
    name: "",
    description: "",
    brand: "",
    price: 0,
    stock: 0,
    category: "",
    statusProduct: "active",
    images: [],
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Fonction pour aplatir les catégories et sous-catégories
  const flattenCategories = (
    cats: Category[],
    prefix = ""
  ): Array<{ id: string; name: string }> => {
    const result: Array<{ id: string; name: string }> = [];
    cats.forEach((cat) => {
      const displayName = prefix ? `${prefix} > ${cat.name}` : cat.name;

      if (cat.subCategories && cat.subCategories.length > 0) {
        result.push(...flattenCategories(cat.subCategories, displayName));
      } else {
        result.push({ id: cat._id, name: displayName });
      }
    });
    return result;
  };

  const availableCategories = flattenCategories(categories);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        brand: product.brand || "",
        price: product.price,
        stock: product.stock,
        category: product.category,
        statusProduct: product.statusProduct,
        images: product.images || [],
      });
      setSelectedFiles([]);
    } else {
      setFormData({
        name: "",
        description: "",
        brand: "",
        price: 0,
        stock: 0,
        category: "",
        statusProduct: "active",
        images: [],
      });
      setSelectedFiles([]);
    }
  }, [product, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 4); // max 4 fichiers
    setSelectedFiles(files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      images: selectedFiles.length ? selectedFiles : formData.images,
    });
  };

  const handleInputChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "price" || field === "stock"
          ? parseFloat(e.target.value) || 0
          : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>
            {product ? "Modifier le produit" : "Ajouter un produit"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom + Marque */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange("name")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                value={formData.brand || ""}
                onChange={handleInputChange("brand")}
                placeholder="Ex: Nivea"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange("description")}
              rows={2}
            />
          </div>

          {/* Prix + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix (dt) *</Label>
              <Input
                id="price"
                type="number"
                step="0.1"
                min="0"
                value={formData.price}
                onChange={handleInputChange("price")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleInputChange("stock")}
                required
              />
            </div>
          </div>

          {/* Catégorie */}
          {!product && <div className="space-y-2">
            <Label>Catégorie *</Label>
            <Select
              value={formData.category as string}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
             
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>}

          {/* Statut */}
          <div className="space-y-2">
            <Label>Statut</Label>
            <Select
              value={formData.statusProduct}
              onValueChange={(value: "active" | "inactive") =>
                setFormData((prev) => ({ ...prev, statusProduct: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Upload Images */}
          {!product && (
            <div className="space-y-2">
              <Label>Images (max 4)</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="flex space-x-2 mt-2">
                {formData.images.map((img, i) => (
                  <img
                    key={i}
                    src={typeof img === "string" ? img : URL.createObjectURL(img)}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              {product ? "Modifier" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
