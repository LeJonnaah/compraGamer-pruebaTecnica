import { Component } from '@angular/core';
import { ProductosService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { SubcategoryService } from 'src/app/services/sub-categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  page!: number;
  products: any[] = [];
  subcategories: any[] = [];

  constructor(
    private productosService: ProductosService,
    private cartService: CartService,
    private subcategoriesService: SubcategoryService
  ) { }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Producto agregado al carrito!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  ngOnInit() {
    this.productosService.getProducts().subscribe(products => {
      this.products = products;
      this.subcategoriesService.getSubcategories().subscribe(subcategories => {
        this.subcategories = subcategories;
        this.productosService.assignSubcategoryNameAndImageUrl(this.products, this.subcategories);
      });
    });
  }
}