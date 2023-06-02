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
  ) { }

  get totalItems() {
    return this.cartService.totalItems;
  }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe((loggedIn) => {
      this.isLogged = loggedIn;
    });
  }


  onClick() {
    this.userService.logout();
    this.router.navigate(['/login']);
    Swal.fire({
      position: 'top-start',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
}