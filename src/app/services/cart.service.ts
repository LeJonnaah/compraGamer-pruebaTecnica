import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  totalItems = 0;
  constructor() { }

  addToCart(product: any): void {
    this.cartItems.push(product);
    this.totalItems++;
  }

  removeFromCart(product: any): void {
    const index = this.cartItems.indexOf(product);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getCartItemCount(): number {
    return this.cartItems.length;
  }
  
}
