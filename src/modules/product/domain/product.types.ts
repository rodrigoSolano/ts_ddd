// All properties that a Product has
export interface ProductProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface CreateProductProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}
