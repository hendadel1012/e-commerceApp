import { Component } from '@angular/core';
import { SliderComponent } from './slider/slider.component';
import { CategoryHomeComponent } from './category-home/category-home.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { NewsLetterComponent } from "./news-letter/news-letter.component";

@Component({
  selector: 'app-home',
  imports: [SliderComponent, CategoryHomeComponent, ProductHomeComponent, NewsLetterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
