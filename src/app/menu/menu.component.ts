import { Component} from '@angular/core';
import { MaterialModule } from '../Materials/material/material.module';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { EmployeelistComponent } from '../employeelist/employeelist.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterLink,RouterOutlet,EmployeelistComponent,MatSidenavModule,DashboardComponent],
    templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
 
}

