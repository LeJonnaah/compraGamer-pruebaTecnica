import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  cartItems = [];
  isLogged = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private cartService: CartService
  ) {}

  // Propiedad para obtener el número total de elementos en el carrito
  get totalItems() {
    return this.cartService.totalItems;
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Suscribirse al estado de inicio de sesión del usuario
    this.userService.isLoggedIn.subscribe((loggedIn) => {
      this.isLogged = loggedIn; // Actualizar la variable isLogged
    });
  }

  // Método que se ejecuta al hacer clic en el botón de logout
  onClick() {
    this.userService.logout(); 
    this.router.navigate(['/login']); 
    Swal.fire({
      icon: 'success',
      title: 'Has cerrado sesión',
      showConfirmButton: false,
      timer: 1500
    }); 
  }
}
