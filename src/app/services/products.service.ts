import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productApiUrl = 'https://static.compragamer.com/test/productos.json';
  private imageBaseUrl = 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';


  constructor(private http: HttpClient) { }

  // Obtener lista de productos desde la API
  getProducts() {
    return this.http.get<any[]>(this.productApiUrl);
  }

  // Asignar nombre de subcategoría e imagen URL a los productos
  assignSubcategoryNameAndImageUrl(products: any[], subcategories: any[]) {
    const subcategoriesMap: Record<string, any> = {};

    // Crear un mapa de subcategorías utilizando el ID como clave
    subcategories.forEach(subcategory => {
      subcategoriesMap[subcategory.id] = subcategory;
    });

    // Asignar nombre de subcategoría e URL de imagen a cada producto
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