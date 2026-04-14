import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

    subProducts = signal<Product[]>([]);
    selectedSubcategory = signal<any>(null);
    
   private readonly httpClient=inject(HttpClient);

  getAllCategories():Observable<any>{
    return this.httpClient.get(environment.baseUrl +`/api/v1/categories`)
  }

  getSpecificCategory(id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl +`/api/v1/categories/${id}`)
  }

  getAllSubCategory():Observable<any>{
    return this.httpClient.get(environment.baseUrl +`/api/v1/subcategories`)
  }
}
