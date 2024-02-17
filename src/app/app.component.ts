import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { NotificationService } from './services/notification.service';
import { MaterialModule } from './Materials/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,MaterialModule,ReactiveFormsModule,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[EmployeeService,NotificationService],
  
})
export class AppComponent {
  title = 'employee';
}
