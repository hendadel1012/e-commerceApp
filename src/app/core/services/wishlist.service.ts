import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private readonly httpClient=inject(HttpClient);

  addProductToWishlist(prodId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/api/v1/wishlist`,
      {
    productId:prodId
  })
  }

  removeProductFromWishlist(prodId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v1/wishlist/${prodId}`)
  }

  getLoggedUserWishlist():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/wishlist`)
  }



}

