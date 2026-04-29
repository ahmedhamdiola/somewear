import { useEffect, useState } from "react";
import {getProducts,deleteProduct,updateProduct,addProduct,type Product,} from "../services/products";
import { toast } from "react-toastify";

import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "../../../components/ui/table";

import { Button } from "../../../components/ui/button";

import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter} from "../../../components/ui/dialog";

import { Input } from "../../../components/ui/input";
export const Products = () => {

  const[products,setProducts] = useState<Product[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [current, setCurrent] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");


  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load products");
      }
    };
    load();
  }, []);

  const handleOpenEdit=(p:Product)=>{
    setCurrent(p);
    setName(p.name);
    setPrice(p.price.toString());
    setDescription(p.description);
    setStock(p.stock.toString());
    setDialogOpen(true);
  }
 
  const handleAdd = () => {
    setCurrent(null);
    setName("");
    setPrice("");
    setDescription("");
    setStock("");
    setDialogOpen(true);
  };

  const validationDialog =()=> {
    if (!name || !price|| !stock || !description){
  
    toast.error("All fields required");
    return false;
  }
  if(parseFloat(price)<=0 || parseInt(stock)<=0)
  {
    toast.error("Invalid number");
    return false;
  }
  return true;
  }

const handleSave =async()=>{
    
  if(!validationDialog()) return;


  
  if(current) {
  const updated: Product = {
    ...current,
    name,
    price:parseFloat(price),
    description,
    stock:parseInt(stock),
  };
    await updateProduct(updated);
}
else {

  const newProduct: Product = {
          id: Date.now().toString(),
          name,
          price: +price,
          description,
          stock: +stock,
        };
        await addProduct(newProduct);
}

    const fresh = await getProducts();
    setProducts(fresh);
    setDialogOpen(false);
    setCurrent(null);
    toast.success("Saved!");
  
 

}

const handleDelete=async(id:string)=>{
  try {
    await deleteProduct(id);
    const fresh = await getProducts();
    setProducts(fresh);
    toast.success("Deleted!");
  } catch (error) {
    console.log(error)
    toast.error("Error");
  }
}


  return (
    <div >

      <div className="flex justify-between items-center">
      <h1 className="text-[24px] mb-4">Products</h1>
        <Button onClick={handleAdd} >Add Product</Button>
      </div>

     <Table>
    
    <TableHeader>
      <TableRow>
            <TableHead>name</TableHead>
            <TableHead>price</TableHead>
            <TableHead>description</TableHead>
            <TableHead>stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
    </TableHeader>

    <TableBody>
      {products.map((p)=>(
        <TableRow key={p.id}>
          <TableCell>{p.name}</TableCell>
          <TableCell>{p.price}</TableCell>

          <TableCell
                className="max-w-[150px] truncate"
                title={p.description}
              >
                {p.description}
              </TableCell>
          <TableCell>{p.stock}</TableCell>
          <TableCell>
            <Button onClick={() => handleOpenEdit(p)} className="me-2">Edit</Button>
            <Button onClick={() => handleDelete(p.id)}  variant="destructive" >Delete</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody> 
     </Table>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
         <DialogContent>
          <DialogHeader>
            
            <DialogTitle>{current ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <label>Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value) } placeholder="name" />
          </div>
          <div className="grid gap-2">
            <label>Price</label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="price" />
          </div>
          <div className="grid gap-2">
            <label>Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
            />
          </div>
          <div className="grid gap-2">
            <label>Stock</label>
            <Input value={stock} onChange={(e) => setStock(e.target.value)}
            placeholder="stock" />
          </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>


      </div>
  ) ;
} 
export default Products;
