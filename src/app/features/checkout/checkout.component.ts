import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {

   private readonly activatedRoute=inject(ActivatedRoute);
   private readonly fb=inject(FormBuilder);
   private readonly cartService=inject(CartService);
   private readonly router=inject(Router);


   checkOut:FormGroup=this.fb.group({
    shippingAddress:this.fb.group({
      details:["" , [Validators.required, Validators.minLength(4)]],
      phone:["" , [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:["" , [Validators.required,Validators.minLength(4)]],
    })
   })

   flag=signal<string>("cash");
   cartId=signal<string>("");

  ngOnInit(): void {
    this.getCartId();
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe((params)=>{
    params.get('id');

    this.cartId.set( params.get('id')!)
   })
  }

  changeFlag(el:HTMLInputElement):void{
    this.flag.set(el.value);
  }


  submitForm():void{

    if(this.checkOut.valid){
      if(this.flag() ==='cash'){
        //call api cash
       this.cartService.createCashOrder(this.cartId(),this.checkOut.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status==='success'){
            this.router.navigate(['/allorders'])
          }
        }
       })
      }

      else{
        //call api visa
         this.cartService.createVisaOrder(this.cartId(),this.checkOut.value).subscribe({
        next:(res)=>{
          console.log(res);
           if(res.status==='success'){
            window.open(res.session.url, '_self')
           }
        }
       })
      }



    }
    else{
      this.checkOut.markAllAsTouched();
    }
  }



}
