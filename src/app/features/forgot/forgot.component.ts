import { email } from '@angular/forms/signals';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {

  private readonly authService= inject(AuthService);
  private readonly router= inject(Router);

  step=signal<number>(1);

  email:FormControl=new FormControl("", [Validators.required,Validators.email]);
  code:FormControl=new FormControl("", [Validators.required]);
  password:FormControl=new FormControl("", [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]);



  submitEmail(e:Event):void{
    e.preventDefault();
    if(this.email.valid){
      const data={
        email:this.email.value
      }

      this.authService.forgotPassword(data).subscribe({
        next:(res)=>{
          this.step.set(2);
        }
      })
    }
  }

  resendCode(): void {
    if (this.email.valid) {
       const data={
        email:this.email.value
      }

      this.authService.forgotPassword(data).subscribe({
        next: (res) => {
          console.log("Code Resent Successfully!");
        }
      });
    }
  }

  submitCode(e:Event):void{
    e.preventDefault();
    if(this.code.valid){
      const data={
        resetCode:this.code.value
      }

       this.authService.verifyCode(data).subscribe({
        next:(res)=>{
          this.step.set(3);
        }
      })
    }
  }


  submitPassword(e:Event):void{
    e.preventDefault();
    if(this.password.valid){
      const data={
        email:this.email.value,
        newPassword:this.password.value
      }

       this.authService.resetPassword(data).subscribe({
        next:(res)=>{
          this.router.navigate(['/login'])
        }
      })
    }
  }

   showPassword(element:HTMLInputElement):void{

    if(element.type=== 'password'){
      element.type='text';
    }
    else{
      element.type= 'password';
    }
  }
}
