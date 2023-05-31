import { Component } from '@angular/core';
import { ProductosService } from '../../services/products.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  productos: any[] = [];


  constructor(private productosService: ProductosService) {}

  async ngOnInit() {
    const data = await this.productosService.getProductos().toPromise();
    if (data) {
      this.productos = data;
      this.productosService.getImageUrl(this.productos);
    }
  }
}
