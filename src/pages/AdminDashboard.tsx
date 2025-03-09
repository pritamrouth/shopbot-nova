
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Plus, Save, Image as ImageIcon, Trash } from "lucide-react";

interface ProductFormData {
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  description?: string;
}

const initialFormData: ProductFormData = {
  name: "",
  price: 0,
  category: "",
  image: "",
};

const AdminDashboard = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if not an admin
    if (!isAdmin && !isAuthenticated) {
      navigate("/signin");
    } else if (!isAdmin) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
    }
  }, [isAdmin, isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "originalPrice" || name === "discount" 
        ? parseFloat(value) || 0 
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.category || !formData.image) {
        throw new Error("Please fill all required fields");
      }

      // Add product to Supabase
      const { data, error } = await supabase
        .from("products")
        .insert([{
          name: formData.name,
          price: formData.price,
          original_price: formData.originalPrice || null,
          discount: formData.discount || null,
          category: formData.category,
          image: formData.image,
          description: formData.description || null,
          rating: 0,
          review_count: 0,
        }])
        .select();

      if (error) throw error;

      toast({
        title: "Product Added!",
        description: "The product has been successfully added to the store.",
      });

      // Reset form
      setFormData(initialFormData);
    } catch (error: any) {
      toast({
        title: "Failed to add product",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return <div className="p-8 text-center">Checking permissions...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus size={20} />
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Product Name *
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Price *
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price || ""}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label htmlFor="originalPrice" className="block text-sm font-medium mb-1">
                Original Price (if on sale)
              </label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.originalPrice || ""}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="discount" className="block text-sm font-medium mb-1">
                Discount % (if on sale)
              </label>
              <Input
                id="discount"
                name="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount || ""}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category *
              </label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., t-shirts, jeans, shirts"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL *
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Adding Product...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save size={18} />
                Add Product
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
