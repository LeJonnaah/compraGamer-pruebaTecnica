import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { SubcategoryService } from 'src/app/services/sub-categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  page!: number;
  products: any[] = [];
  subcategories: any[] = [];
  selectedCategory: number = 0;
  filteredProducts: any[] = [];
  
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

  ngOnInit() : void {
    this.productosService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = this.products;
      this.assignSubcategoryNameAndImageUrl();
    });
    this.subcategoriesService.getSubcategories().subscribe(subcategories => {
      this.subcategories = subcategories;
      this.assignSubcategoryNameAndImageUrl();
    });
  }
  
  filterProducts(category: number) {
    this.selectedCategory = category;
    this.filteredProducts = (category) ? this.products.filter(product => product.id_subcategoria == category) : this.products;
  }

  assignSubcategoryNameAndImageUrl() {
    this.productosService.assignSubcategoryNameAndImageUrl(this.products, this.subcategories);
  }
}