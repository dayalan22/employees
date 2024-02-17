import { Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from '../Materials/material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../services/notification.service';
import { AuthserviceService } from '../auth/authservice/authservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MaterialModule,MatFormFieldModule,
    MatButtonModule,MatCardModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[NotificationService,AuthserviceService]
})


export class LoginComponent{
  msg!:string;
  userDetails!:any[];
  
  constructor(private route : Router,public _notify : NotificationService, private _service : AuthserviceService)
  {
    this._service.getUsers().subscribe(data=>{this.userDetails=data});
  }
    emailFormControl = new FormControl('', [Validators.required]);
    passwordFormControl = new FormControl('',[Validators.required])
  
  login()
  {
    let result = false;
    if(this.emailFormControl.valid && this.passwordFormControl.valid)
    {
      const emailValue = this.emailFormControl.value;
      const passwordValue = this.passwordFormControl.value;

      for(let i=0;i<this.userDetails.length ; i++)
      {
        if(this.userDetails[i]['email']==emailValue && this.userDetails[i]['password']==passwordValue)
        {
          this._notify.success("Login Successfully");
          setTimeout(()=>{this.route.navigate(['/menu'])},1000);
          result=true;
          break;
        }
      }
      if (result==false)
      {
        this._notify.login("! please check your email or password");
      }
    }
  }
}
