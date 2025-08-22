import { Cart } from '../entities/cart.entity';

export interface CartRepository {
  getByUserId(userId: string): Promise<Cart | null>;
  addItem(userId: string, productId: string, quantity: number): Promise<void>;
  removeItem(userId: string, productId: string): Promise<void>;
  clearCart(userId: string): Promise<void>;
}
