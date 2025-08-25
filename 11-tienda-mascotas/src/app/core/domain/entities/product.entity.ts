// Entidad Product. Define la estructura de un producto en la tienda de mascotas.
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}
