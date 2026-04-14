import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  private readonly authService= inject(AuthService);
  private readonly cartService= inject(CartService);
  private readonly pLATFORM_ID= inject(PLATFORM_ID);

  logged=computed(()=>this.authService.isLogged());  //computed ===> readonly signal(مش هينفع اغير فيها مباشرة ف بغير فى اللى معتمد عليها )
  count=computed(()=>this.cartService.cartCount())

   constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {

   if(isPlatformBrowser(this.pLATFORM_ID)){
    this.getCartCount();
     if(localStorage.getItem('freshToken')){
      this.authService.isLogged.set(true);
    }
   }

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logOut():void{
    this.authService.signOut();
  }


   getCartCount():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.numOfCartItems);
        this.cartService.cartCount.set(res.numOfCartItems);
      }
    })
  }

}
