import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly productsService=inject(ProductsService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly wishlistService =inject(WishlistService);

  productDetails=signal<Product>({} as Product)
  images=signal([]);
  activeIndex = signal(0);
  reviews = signal<[]>([]);

  ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe((params)=>{
    this.getProductDetails(params.get('id')!)
    this.getReviewDetails(params.get('id')!)
   })
  }

  getProductDetails(id:string):void{
    this.productsService.getSpecificProduct(id).subscribe({
      next:(res)=>{
        this.productDetails.set(res.data);
        console.log(res);
        this.images.set(res.data.images);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getReviewDetails(id:string):void{
    this.productsService.getReviewsProduct(id).subscribe({
      next:(res)=>{
        this.reviews.set(res.data)
        console.log(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


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

  selectImage(index:number):void{
  this.activeIndex.set(index);

}
}
