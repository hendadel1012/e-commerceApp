import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-category-details',
  imports: [RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {

   private readonly activatedRoute=inject(ActivatedRoute);
   private readonly categoriesService=inject(CategoriesService);
   private readonly productsService=inject(ProductsService);

    categoryDetails=signal<Category>({} as Category)
    subCategory=signal<Category[]>([])

    ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe((params)=>{
    this.getCategoryDetails(params.get('id')!)
   })
   this.getSubCategories();
  }

  getCategoryDetails(id:string):void{
      this.categoriesService.getSpecificCategory(id).subscribe({
      next:(res)=>{
        this.categoryDetails.set(res.data);
        console.log(this.categoryDetails())
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getSubCategories():void{
    this.categoriesService.getAllSubCategory().subscribe({
      next:(res)=>{
      this.subCategory.set(res.data);

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

private readonly router=inject(Router)

getSubcategoryProducts(subItem: any): void {
  this.productsService.getProducts(60).subscribe({
    next: (res) => {
      const filtered = res.data.filter((product: any) => {

        return product.subcategory?.some((s: any) => s._id === subItem._id) || product.subcategory?._id === subItem._id;
      });

      this.categoriesService.subProducts.set(filtered);

      this.categoriesService.selectedSubcategory.set(subItem);

      this.router.navigate(['/subcategory-details']);
    }
  });
}
}
