import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Order } from '../../core/models/order.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-orders',
  imports: [DatePipe, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {

  private readonly cartService=inject(CartService);
  private readonly pLATFORM_ID=inject(PLATFORM_ID);
  userId:string="";
  ordersList=signal<Order[]>([])

   ngOnInit(): void {
     if(isPlatformBrowser(this.pLATFORM_ID)){
      if(localStorage.getItem('freshToken')){
        this.userId = this.getUserIdFromToken();
        this.getUserOrders()
      }}
  }

getUserIdFromToken(): string {
  const token = localStorage.getItem('freshToken')!;
  const decoded: any = jwtDecode(token);
  return decoded.id;
}
  getUserOrders():void{
    this.cartService.getUserOrders(this.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.ordersList.set(res)
      }
    })
  }

}
