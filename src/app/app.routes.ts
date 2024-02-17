import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';


export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'login', component:LoginComponent},
    {path:'create',component:CreateComponent},
    {path:'register',component:RegisterComponent},
    {path:'menu',component:MenuComponent,children : [{path:'employeelist',component:EmployeelistComponent},{path:'dashboard',component:DashboardComponent}]}
];