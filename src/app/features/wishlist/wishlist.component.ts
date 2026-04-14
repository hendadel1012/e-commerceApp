import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from './models/wishlist.interface';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent  implements OnInit{


  private readonly wishlistService =inject(WishlistService);
   private readonly pLATFORM_ID=inject(PLATFORM_ID);

  wishlistDetails=signal<Wishlist[]>([])


   ngOnInit(): void {
     if(isPlatformBrowser(this.pLATFORM_ID)){
      this.getwishlistData()
     }
  }

  getwishlistData():void{
this.wishlistService.getLoggedUserWishlist().subscribe({
  next:(res)=>{
    console.log(res.data);
     this.wishlistDetails.set(res.data)
  }
})
  }

  removeItem(productId:string):void{
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this.getwishlistData()
      }
    })
  }
}
