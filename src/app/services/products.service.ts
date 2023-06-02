import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productApiUrl = 'https://static.compragamer.com/test/productos.json';
  private imageBaseUrl = 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';


  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any[]>(this.productApiUrl);
  }

  assignSubcategoryNameAndImageUrl(products: any[], subcategories: any[]) {
    const subcategoriesMap: Record<string, any> = {};
    subcategories.forEach(subcategory => {
      subcategoriesMap[subcategory.id] = subcategory;
    });

    products.forEach(product => {
      const subcategory = subcategoriesMap[product.id_subcategoria];
      if (subcategory) {
        product.subcategoria = subcategory.nombre;
      }

      const imageName = product.imagenes[0].nombre;
      const imageUrl = `${this.imageBaseUrl}${imageName}-med.jpg`;
      product.imagen = imageUrl;
    });
  }

}