
export interface ProductInterface {
  id?: number ;
  name: string;
  description?: string| null;
  price: number;
  category?: string | null;
  subcategory?: string | null;
  imageUrl?: string | null;
}
