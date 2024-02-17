import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../../Materials/material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from '../authservice/authservice.service';
import { Authmodel } from '../authmodel/authmodel';
import { Router,RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule,MaterialModule,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers : [AuthserviceService,NotificationService]
})
export class RegisterComponent {

  constructor(private _service : AuthserviceService, private route : Router, private _notify : NotificationService)
  {
    this._service.getUsers().subscribe(data=>{this.userDetails=data});
  }
  emailValue!: string;
  userDetails:any[]=[];
  duplicateMail:boolean=false;
  
  registerForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    email : new FormControl('', [Validators.required, Validators.pattern((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))]),
    password : new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)]),   
  })

onRegister()
 {
    this.duplicateMail=false;
    
    if(this.registerForm.controls['name'].valid && this.registerForm.controls['email'].valid && this.registerForm.controls['password'].valid)
    {
      const emaill = this.registerForm.controls['email'].value;
      //find dublicates in email
      if(this.userDetails[0])
      {
        for(let i=0;i<this.userDetails.length;i++)
        {
          if(emaill==this.userDetails[i]['email'])
          {
              this.duplicateMail=true;
              this._notify.warn("email is already existing try different")         
              break;
          }    
        }
      }
      if(this.duplicateMail==false)
      {
        this._notify.success("Registered Successfully")      
        const users =this.registerForm.value;
        this._service.saveUsers(users as Authmodel).subscribe()
        this.registerForm.reset();  
        this.route.navigate([('/login')])          
      }          
    }
  }  

}


