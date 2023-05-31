import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    
    cartItemCount: number = 0;

    constructor(private cartService: CartService) {

    }


    // ngOnInit(): void {
    //   this.cartService.getCartItemCount().subscribe((count: number) => {
    //     this.cartItemCount = count;
    //   });
    // }

}