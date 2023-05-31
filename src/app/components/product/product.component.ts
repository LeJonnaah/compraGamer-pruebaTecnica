import { Component } from '@angular/core';
import { ProductosService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  productos: any[] = [];


  constructor(
    private productosService: ProductosService,
    private cartService: CartService
    ) {}

    getProductList(): void {
      this.productosService.getProductos().subscribe((data: any) => {
        this.productos = data;
        this.productosService.getImageUrl(this.productos);
        console.log(this.productos);
      });
    }

    addToCart(product: any): void {
      this.cartService.addToCart(product);
    }

  async ngOnInit() {
    this.getProductList();

    const data = await this.productosService.getProductos().toPromise();
    if (data) {
      this.productos = data;
      this.productosService.getImageUrl(this.productos);
    }
    
  }
}
