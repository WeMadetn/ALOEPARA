import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ChevronRight, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryModal } from "@/components/modals/CategoryModal";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import { Category, CategoryReq } from "../data/mockData";

export default function Categories() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());


  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });


  const createMutation = useMutation({
    mutationFn: (newCategory: CategoryReq) => createCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsModalOpen(false);
    },
  });


  const updateMutation = useMutation({
    mutationFn: ({ id, category }: { id: string; category: CategoryReq }) =>
      updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsModalOpen(false);
    },
  });


  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });


  const handleAddCategory = (parentId?: string) => {
    setSelectedCategory(null);
    setSelectedParent(parentId || null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setSelectedParent(category.parent || null);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleSaveCategory = (categoryData: CategoryReq) => {
    if (selectedCategory) {
      updateMutation.mutate({ id: selectedCategory._id, category: categoryData });
    } else {
      createMutation.mutate({
        ...categoryData,
        parent: selectedParent || undefined,
      });
    }
  };

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) newExpanded.delete(categoryId);
    else newExpanded.add(categoryId);
    setExpandedCategories(newExpanded);
  };

  // ----- Render Recursive -----
  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.subCategories && category.subCategories.length > 0;
    const isExpanded = expandedCategories.has(category._id);

    return (
      <div key={category._id} className="space-y-2">
        <div
          className={`flex items-center justify-between p-4 bg-card rounded-lg border hover:shadow-soft transition-shadow ${level > 0 ? "ml-8 bg-accent/20" : ""
            }`}
        >
          <div className="flex items-center space-x-3">
            {hasChildren ? (
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => toggleExpanded(category._id)}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            ) : (
              <div className="w-6 h-6" />
            )}
            <div>
              <h3 className="font-medium text-foreground">{category.name}</h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Afficher le bouton seulement si level < 1 (donc parent ou enfant direct) */}
            {level < 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddCategory(category._id)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Sous-catégorie
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEditCategory(category)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteCategory(category._id)}
              className="text-destructive hover:text-destructive"
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

        </div>

        {hasChildren && isExpanded && (
          <div>
            {category.subCategories!.map((child) =>
              renderCategory(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  // ----- Render -----
  if (isLoading)
    return <p className="text-center text-muted-foreground">Chargement des catégories...</p>;
  if (isError)
    return (
      <p className="text-center text-destructive">
        Erreur : {(error as Error).message}
      </p>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Catégories</h1>
          <p className="text-muted-foreground mt-2">
            Organisez vos produits par catégories et sous-catégories
          </p>
        </div>
        <Button
          onClick={() => handleAddCategory()}
          className="bg-primary hover:bg-primary-hover"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Arbre des catégories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories && categories.length > 0 ? (
            categories.map((category) => renderCategory(category))
          ) : (
            <p className="text-muted-foreground text-center">
              Aucune catégorie trouvée
            </p>
          )}
        </CardContent>
      </Card>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={selectedCategory}
        parentId={selectedParent}
        categories={categories || []}
      />
    </div>
  );
}
