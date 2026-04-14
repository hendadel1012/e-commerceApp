import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.interface';
import { CardComponent } from "../../../shared/ui/card/card.component";

@Component({
  selector: 'app-product-home',
  imports: [ CardComponent],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.css',
})
export class ProductHomeComponent implements OnInit {

  private readonly productsService=inject(ProductsService);

  productList=signal<Product[]>([])

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.productList.set(res.data)
      }
    })
  }


}
