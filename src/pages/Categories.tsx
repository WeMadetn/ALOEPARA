import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ChevronRight, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryModal } from "@/components/modals/CategoryModal";
import { mockCategories, type Category } from "@/data/mockData";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const handleAddCategory = (parentId?: string) => {
    setSelectedCategory(null);
    setSelectedParent(parentId || null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setSelectedParent(category.parentId || null);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const deleteRecursive = (cats: Category[]): Category[] => {
      return cats.filter(cat => {
        if (cat.id === categoryId) return false;
        if (cat.children) {
          cat.children = deleteRecursive(cat.children);
        }
        return true;
      });
    };
    setCategories(deleteRecursive(categories));
  };

  const handleSaveCategory = (categoryData: Omit<Category, "id" | "children">) => {
    if (selectedCategory) {
      // Édition
      const updateRecursive = (cats: Category[]): Category[] => {
        return cats.map(cat => {
          if (cat.id === selectedCategory.id) {
            return { ...cat, ...categoryData };
          }
          if (cat.children) {
            cat.children = updateRecursive(cat.children);
          }
          return cat;
        });
      };
      setCategories(updateRecursive(categories));
    } else {
      // Ajout
      const newCategory: Category = {
        ...categoryData,
        id: Date.now().toString(),
      };

      if (selectedParent) {
        // Ajouter comme sous-catégorie
        const addToParent = (cats: Category[]): Category[] => {
          return cats.map(cat => {
            if (cat.id === selectedParent) {
              return {
                ...cat,
                children: [...(cat.children || []), newCategory]
              };
            }
            if (cat.children) {
              cat.children = addToParent(cat.children);
            }
            return cat;
          });
        };
        setCategories(addToParent(categories));
      } else {
        // Ajouter comme catégorie principale
        setCategories([...categories, newCategory]);
      }
    }
    setIsModalOpen(false);
  };

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);

    return (
      <div key={category.id} className="space-y-2">
        <div 
          className={`flex items-center justify-between p-4 bg-card rounded-lg border hover:shadow-soft transition-shadow ${
            level > 0 ? 'ml-8 bg-accent/20' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            {hasChildren ? (
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => toggleExpanded(category.id)}
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
              {category.description && (
                <p className="text-sm text-muted-foreground">{category.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAddCategory(category.id)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Sous-catégorie
            </Button>
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
              onClick={() => handleDeleteCategory(category.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {category.children!.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Catégories</h1>
          <p className="text-muted-foreground mt-2">
            Organisez vos produits par catégories et sous-catégories
          </p>
        </div>
        <Button onClick={() => handleAddCategory()} className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Arbre des catégories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map(category => renderCategory(category))}
        </CardContent>
      </Card>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={selectedCategory}
        parentId={selectedParent}
        categories={categories}
      />
    </div>
  );
}