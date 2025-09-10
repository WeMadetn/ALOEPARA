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
import { type Category } from "@/data/mockData";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, "id" | "children">) => void;
  category: Category | null;
  parentId: string | null;
  categories: Category[];
}

export function CategoryModal({ isOpen, onClose, onSave, category, parentId, categories }: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    parentId: parentId || undefined,
  });

  const getParentName = (id: string): string => {
    for (const cat of categories) {
      if (cat._id === id) return cat.name;
      if (cat.subCategories) {
        for (const child of cat.subCategories) {
          if (child._id === id) return child.name;
        }
      }
    }
    return "";
  };

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        parentId: category.parent,
      });
    } else {
      setFormData({
        name: "",
        parentId: parentId || undefined,
      });
    }
  }, [category, parentId, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const isSubCategory = !!parentId;
  const parentName = parentId ? getParentName(parentId) : "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>
            {category ? "Modifier la catégorie" : 
             isSubCategory ? `Ajouter une sous-catégorie à "${parentName}"` : 
             "Ajouter une catégorie"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSubCategory && (
            <div className="p-3 bg-accent/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Cette {category ? "catégorie" : "sous-catégorie"} sera ajoutée sous : <strong>{parentName}</strong>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nom de la catégorie *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              {category ? "Modifier" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}