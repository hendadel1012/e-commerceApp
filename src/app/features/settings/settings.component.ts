import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {


  private readonly authservice=inject(AuthService);
  private readonly toastrService=inject(ToastrService);
  private readonly pLATFORM_ID=inject(PLATFORM_ID);
  private readonly router=inject(Router);


   private readonly fb=inject(FormBuilder);

    updateForm:FormGroup= this.fb.group({
    name:["" , [Validators.required, Validators.minLength(3)] ],
    email:["" , [Validators.required, Validators.email] ],
    phone:["" , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ]
  })

   changePassword: FormGroup= this.fb.group({
     currentPassword:["", [Validators.required]],
     password:["",[Validators.required ,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
     rePassword:["", [Validators.required]]
  }, {validators:[this.confirmPassword]});

  ngOnInit(): void {
     if(isPlatformBrowser(this.pLATFORM_ID)){
      if(localStorage.getItem('freshToken')){
        this.updateUserData();
      }}
  }

  updateUserData():void{
    if(this.updateForm.valid){
      this.authservice.updateLoggedUserData(this.updateForm.value).subscribe({
        next:(res)=>{
          console.log(res)
        }
      })
    }
    else{
      this.updateForm.markAllAsTouched();
    }
  }


confirmPassword(group:AbstractControl){

    const Password=group.get('password')?.value;
    const rePassword=group.get('rePassword')?.value;

    if(rePassword!==Password&& rePassword!==''){

      group.get('rePassword')?.setErrors({mismatch:true});

      return {mismatch:true}
    }
    return null;
  }

  submitForm(){

  if(this.changePassword.valid){
    this.authservice.updateLoggedUserPassword(this.changePassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success(res.message,"Fresh Cart", {progressBar:true,closeButton:true});
        this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.log(err);
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
