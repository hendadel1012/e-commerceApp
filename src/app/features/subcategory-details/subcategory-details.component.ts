import { Product } from './../../core/models/product.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { CardComponent } from "../../shared/ui/card/card.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-subcategory-details',
  imports: [CardComponent, RouterLink],
  templateUrl: './subcategory-details.component.html',
  styleUrl: './subcategory-details.component.css',
})

export class SubcategoryDetailsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);


  subproducts = this.categoriesService.subProducts;
  selectedSub = this.categoriesService.selectedSubcategory;

  ngOnInit(): void {
    console.log('Subcategories found:', this.subproducts());
  }
}
