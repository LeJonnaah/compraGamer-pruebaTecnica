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
  productos: any[] = [];
  subcategorias: any[] = [];
  page!: number;
  subcategory = [
  {
    "id": 2,
    "nombre": "Mouses ",
    "id_agrupador": 24,
    "imagen": "Mouses-2.jpg",
    "orden": 3
  },
  {
    "id": 5,
    "nombre": "Monitores y pantallas ",
    "id_agrupador": 6,
    "imagen": "monitores.jpg",
    "orden": 2
  },
  {
    "id": 6,
    "nombre": "Placas de Video GeForce ",
    "id_agrupador": 2,
    "imagen": "Placas_Video_Nvidial_20220512.jpg",
    "orden": 4
  },
  {
    "id": 7,
    "nombre": "Gabinetes ",
    "id_agrupador": 8,
    "imagen": "gabinetes.jpg",
    "orden": 5
  },
  {
    "id": 8,
    "nombre": "Auriculares ",
    "id_agrupador": 24,
    "imagen": "auricular1.jpg",
    "orden": 0
  },
  {
    "id": 15,
    "nombre": "Memorias ",
    "id_agrupador": 10,
    "imagen": "ram4.jpeg",
    "orden": 8
  },
  {
    "id": 16,
    "nombre": "Discos Externos ",
    "id_agrupador": 9,
    "imagen": "discos portables.jpg",
    "orden": 9
  },
  {
    "id": 19,
    "nombre": "Discos Rígidos  ",
    "id_agrupador": 9,
    "imagen": "discos.jpg",
    "orden": 11
  },
  {
    "id": 26,
    "nombre": "Mothers AMD",
    "id_agrupador": 1,
    "imagen": "Mothers_AMD-2.jpg",
    "orden": 13
  },
  {
    "id": 27,
    "nombre": "Procesadores AMD ",
    "id_agrupador": 7,
    "imagen": "Procesadores_AMD-2.jpg",
    "orden": 14
  },
  {
    "id": 34,
    "nombre": "Fuentes de alimentación ",
    "id_agrupador": 26,
    "imagen": "fuente.jpg",
    "orden": 16
  },
  {
    "id": 35,
    "nombre": "Coolers Fan ",
    "id_agrupador": 25,
    "imagen": "coolers.jpg",
    "orden": 17
  },
  {
    "id": 36,
    "nombre": "Coolers CPU",
    "id_agrupador": 25,
    "imagen": "cpu_cooler.jpg",
    "orden": 18
  },
  {
    "id": 39,
    "nombre": "Teclados ",
    "id_agrupador": 24,
    "imagen": "Teclados-2.jpg",
    "orden": 2
  },
  {
    "id": 48,
    "nombre": "Procesadores Intel ",
    "id_agrupador": 7,
    "imagen": "Procesadores_Intel-2.jpg",
    "orden": 19
  },
  {
    "id": 49,
    "nombre": "Mothers Intel",
    "id_agrupador": 1,
    "imagen": "Mothers_Intel_20220512.jpg",
    "orden": 20
  },
  {
    "id": 58,
    "nombre": "Notebooks ",
    "id_agrupador": 5,
    "imagen": "laptop.jpg",
    "orden": 21
  },
  {
    "id": 62,
    "id_agrupador": 2,
    "imagen": "Placas_de_Video_Radeon_AsRock_20220512_1424.jpg",
    "nombre": "Placas de Video Radeon AMD",
    "orden": 22
  }
]

  constructor(
    private productosService: ProductosService,
    private cartService: CartService,
    private subcategoriesService: SubcategoryService
    ) {}

    // getProductList(): void {
    //   this.productosService.getProductos().subscribe((data: any) => {
    //     this.productos = data;
    //     this.productosService.getImageUrl(this.productos);
    //   });
    // }

    getProductList() {
      this.productosService.getProductos().subscribe((res: any) => {
        const productos = res.data;
        const subcategorias = this.subcategorias;
  
        const productosConSubcategorias = productos.map((producto: any) => {
          const subcategoria = subcategorias.find(subcategoria => subcategoria.id === producto.id_subcategoria);
          console.log(subcategoria);
          return { ...producto, subcategoria };
        });
  
        this.productos = productosConSubcategorias;
        this.productosService.getImageUrl(this.productos);
      });
    }

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

  async ngOnInit() {
    this.getProductList();

    const data = await this.productosService.getProductos().toPromise();
    if (data) {
      this.productos = data;
      this.productosService.getImageUrl(this.productos);
    }
    
    
    const subcategories = await this.subcategoriesService.getSubcategories().toPromise();
    if (subcategories) {
      console.error(subcategories);
      this.subcategorias = subcategories;
    }

  }
}
