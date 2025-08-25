// Entidades Cart y CartItem. Definen la estructura del carrito de compras y sus items.
export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}
