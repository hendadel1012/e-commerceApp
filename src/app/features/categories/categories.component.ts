import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {

  private readonly categoriesService=inject(CategoriesService);

   categoryList=signal<Category[]>([])

  ngOnInit(): void {
    this.getCategoriesData()
  }

  getCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
}
