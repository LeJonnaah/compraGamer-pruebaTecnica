import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  // Método para eliminar un producto del carrito
  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }

  // Método para obtener el precio total del carrito
  getTotalPrice() {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.precio;
    });
    return total;
  }

  ngOnInit(): void {
    // Al inicializar el componente, obtenemos los elementos del carrito desde el servicio
    this.cartItems = this.cartService.getCartItems();
  }
}
