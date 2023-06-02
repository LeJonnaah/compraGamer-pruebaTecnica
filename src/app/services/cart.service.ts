import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = []; // Array para almacenar los elementos del carrito
  totalItems = 0; // Contador de elementos del carrito

  constructor() { }

  // Método para agregar un producto al carrito
  addToCart(product: any): void {
    this.cartItems.push(product); // Agregar el producto al array de elementos del carrito
    this.totalItems++; // Incrementar el contador de elementos del carrito
  }

  // Método para eliminar un producto del carrito
  removeFromCart(product: any): void {
    this.cartItems.splice(product, 1); // Eliminar el producto del array de elementos del carrito
    this.totalItems--; // Decrementar el contador de elementos del carrito
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
