import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private subcategoryUrl = 'https://static.compragamer.com/test/subcategorias.json';

  constructor(private http: HttpClient) { }

  getSubcategories(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.subcategoryUrl);
  }
}