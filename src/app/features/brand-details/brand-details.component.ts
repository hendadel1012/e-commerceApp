import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/models/brand.interface';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from "../../shared/ui/card/card.component";

@Component({
  selector: 'app-brand-details',
  imports: [CardComponent, RouterLink],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css',
})
export class BrandDetailsComponent implements OnInit{

   private readonly activatedRoute=inject(ActivatedRoute);
   private readonly brandsService=inject(BrandsService);
   private readonly productsService=inject(ProductsService);

   brandDetails=signal<Brand>({} as Brand)
    brandProducts=signal<Product[]>([])

    ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe((params)=>{
    this.getBrandDetails(params.get('id')!)
    this.getBrandProducts(params.get('id')!)
   })
  }

  getBrandDetails(id:string):void{
    this.brandsService.getSpecificBrand(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.brandDetails.set(res.data);
      }
    })

  }

 getBrandProducts(id:string):void{
  this.productsService.getProducts(60).subscribe({
    next:(res)=>{

      const filtered = res.data.filter(
        (product:any)=> product.brand?._id === id
      );

      this.brandProducts.set(filtered);
    }
  })
}
}
