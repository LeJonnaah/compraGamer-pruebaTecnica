import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private subcategoryUrl = 'https://static.compragamer.com/test/subcategorias.json';

  constructor(private http: HttpClient) { }

  getSubcategories() {
    return this.http.get<any[]>(this.subcategoryUrl);
  }

}