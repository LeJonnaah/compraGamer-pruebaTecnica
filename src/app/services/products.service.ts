import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productApiUrl = 'https://static.compragamer.com/test/productos.json';
  private imageBaseUrl = 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';
  private cartItems: any[] = [];

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get<any[]>(this.productApiUrl);
  }


  getImageUrl(products: any[]) {
    try {
      products.map(product => {
        product.imagenes = this.imageBaseUrl + product.imagenes[0].nombre + '-med.jpg';
        return this.http.get( product.imagenes ).pipe(map(response => ({ product, image: response })));
    });
    } catch (error) {
      console.log(error);
    }
  }
}