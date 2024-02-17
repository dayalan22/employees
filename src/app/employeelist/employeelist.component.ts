import {  Component, DoCheck, OnInit,ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { MaterialModule } from '../Materials/material/material.module';
import { EmployeeService } from '../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { RouterModule } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { UpdateformComponent } from '../updateform/updateform.component';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-employeelist',
  standalone: true,
  imports: [RouterOutlet,MenuComponent,MaterialModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})

export class EmployeelistComponent implements OnInit{
  
  constructor(private _service : EmployeeService, public _notificaion : NotificationService, public dialog : MatDialog)
  { 
  }

 
  employeeDetails! : MatTableDataSource<any>;
  displayedColumns : string[] = ["id","name","email","phone","dob","actions"]; 
  @ViewChild(MatSort) sort! : MatSort
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  value!:string;
 
  ngOnInit(): void {
    this.fillTable()  ;
  }

  fillTable()
  {
      this._service.getEmployees().subscribe(data => {
      this.employeeDetails=new MatTableDataSource(data);
      this.employeeDetails.sort=this.sort;
      this.employeeDetails.paginator=this.paginator;
    })
  }

  filterItems()
  {
   this.employeeDetails.filter=this.value.trim().toLowerCase(); 
  }

  clearAll()
  {
    this.value="";
    this.filterItems();
  }

  onEdit(row : any)
  {      
      const dialogRef =  this.dialog.open(UpdateformComponent,{
      disableClose:true,
      width:'60%',
      height:'500px',
      data: {id : row['id'], name : row['name'],email : row['email'], phone:row['phone'], dob:row['dob']}
    })
    dialogRef.afterClosed().subscribe(res=>{
    this.ngOnInit();
   })
  }
  onDelete(row: any)
  { 
    const dialogRef =  this.dialog.open(ConfirmdialogComponent,{
      width:'25%',
      height:'120px',
      data:{id: row['id']}
  
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.ngOnInit();
     })      
       
  }
}
