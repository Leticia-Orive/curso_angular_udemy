import { Injectable } from '@angular/core';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { Cart, CartItem } from '../../domain/entities/cart.entity';

@Injectable({ providedIn: 'root' })
export class InMemoryCartRepository implements CartRepository {
  private carts: Cart[] = [
    { id: '1', userId: '1', items: [] }
  ];

  getByUserId(userId: string): Promise<Cart | null> {
    const cart = this.carts.find((c: Cart) => c.userId === userId) || null;
    return Promise.resolve(cart);
  }

  addItem(userId: string, productId: string, quantity: number): Promise<void> {
    let cart = this.carts.find((c: Cart) => c.userId === userId);
    if (!cart) {
      cart = { id: (this.carts.length + 1).toString(), userId, items: [] };
      this.carts.push(cart);
    }
    const item = cart.items.find((i: CartItem) => i.productId === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    return Promise.resolve();
  }

  removeItem(userId: string, productId: string): Promise<void> {
    const cart = this.carts.find((c: Cart) => c.userId === userId);
    if (cart) {
      cart.items = cart.items.filter((i: CartItem) => i.productId !== productId);
    }
    return Promise.resolve();
  }

  clearCart(userId: string): Promise<void> {
    const cart = this.carts.find(c => c.userId === userId);
    if (cart) {
      cart.items = [];
    }
    return Promise.resolve();
  }
}
