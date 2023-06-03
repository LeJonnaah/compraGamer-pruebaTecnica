import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  totalItems = 0;

  constructor() { }

  // Método para agregar un producto al carrito
  addToCart(product: any): void {
    this.cartItems.push(product);
    this.totalItems++;
  }

  // Método para eliminar un producto del carrito
  removeFromCart(product: any): void {
    this.cartItems.splice(product, 1); 
    this.totalItems--;
  }

  // Método para obtener todos los elementos del carrito
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Método para limpiar el carrito (eliminar todos los elementos)
  clearCart(): void {
    this.cartItems = [];
  }

  // Método para obtener la cantidad de elementos en el carrito
  getCartItemCount(): number {
    return this.cartItems.length;
  }
}
