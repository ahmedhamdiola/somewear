import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  addProduct,
  type Product,
} from "../services/products";
import { toast } from "react-toastify";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openDialog, setDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load products");
      }
    };
    load();
  }, []);

  const handleEditProduct = (pro: Product) => {
    setCurrentProduct(pro); //curent
    setName(pro.name);
    setDescription(pro.description);
    setPrice(pro.price);
    setCategory(pro.category);
    setSubcategory(pro.subcategory);
    setImageUrl(pro.imageUrl);
    setDialogOpen(true);
  };
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setName("");
    setDescription("");
    setPrice(0);
    setCategory("");
    setSubcategory("");
    setImageUrl("");
    setDialogOpen(true);
  };
  const validationDialog = () => {
    if (!name ||!price ||!description ||!category ||!subcategory ||!imageUrl) {
      toast.error("All fields are required");
      return false;
    }
    if (price <= 0) {
      toast.error("Invalid price");
      return false;
    }
    return true;
  };

  const handleSaveProduct = async () => {
    if (!validationDialog()) return;

    try {
      if (currentProduct) {
        const updated: Product = {
          id: currentProduct.id,
          name,
          description,
          price,
          category,
          subcategory,
          imageUrl,
        };
        await updateProduct(updated);
        toast.success("product updated successfully");
      } else {
        const newProduct = {
          name,
          price,
          description,
          category,
          subcategory,
          imageUrl,
        };
        await addProduct(newProduct);
        toast.success("Product added successfully!");
      }
      const fresh = await getProducts();
      setProducts(fresh);
      setDialogOpen(false);
      setCurrentProduct(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save product");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      await deleteProduct(id);
      toast.success("Deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting product");
      const fresh = await getProducts();
      setProducts(fresh);
    }
  };

  return (
    <div className="">
      <div className="flex item-center justify-between mb-5">
        <h1 className="text-[24px] font-bold ">manage products</h1>
        <Button onClick={handleAddProduct}>Add products</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>image</TableHead>
            <TableHead>name</TableHead>
            <TableHead>category</TableHead>
            <TableHead>subcategory</TableHead>
            <TableHead>price</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((pro) => (
            <TableRow>
              <TableCell>
                <img
                  src={pro.imageUrl}
                  alt={pro.name}
                  className="w-16 h-16 object-cover rounded-md shadow-sm border border-gray-200"
                />
              </TableCell>
              <TableCell>{pro.name}</TableCell>
              <TableCell>{pro.category}</TableCell>
              <TableCell>{pro.subcategory}</TableCell>
              <TableCell>{pro.price}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditProduct(pro) } variant="outline" className="mx-2">Edit</Button>
                <Button onClick={() => handleDelete(pro.id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


       <Dialog open={openDialog} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Price</label>
              <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" /> 
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Description</label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Category</label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder=" Men, Women, Kids" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Subcategory</label>
              <Input value={subcategory} onChange={(e) => setSubcategory(e.target.value)} placeholder=" Shirts, Pants" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Image URL</label>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProduct}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Products;
