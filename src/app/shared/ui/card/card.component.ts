import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {

 product=input.required<Product>();

  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
   private readonly wishlistService =inject(WishlistService);

  addToCart(id:string):void{

    if(localStorage.getItem('freshToken')){
        this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success(res.message,"Fresh Cart", {progressBar:true,closeButton:true});
        this.cartService.cartCount.set(res.numOfCartItems)
      }
    })
    }else{
       this.toastrService.warning("Please Login First","Fresh Cart", {progressBar:true,closeButton:true})
    }
  }


  addToWishlist(id:string):void{

    if(localStorage.getItem('freshToken')){
        this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success(res.message,"Fresh Cart", {progressBar:true,closeButton:true});
      }
    })
    }else{
       this.toastrService.warning("Please Login First","Fresh Cart", {progressBar:true,closeButton:true})
    }
  }
}
