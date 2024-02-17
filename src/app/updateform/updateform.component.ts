import { Component, Inject,ViewChild } from '@angular/core';
import { MaterialModule } from '../Materials/material/material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA,MatDialog,MatDialogRef} from '@angular/material/dialog'; 
import { EmployeeService } from '../services/employee.service';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {NativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-updateform',
  standalone: true,
  imports: [MaterialModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './updateform.component.html',
  styleUrl: './updateform.component.css',
  providers : [EmployeeService,NativeDateAdapter]
})
export class UpdateformComponent {

  arr:number[]=[];
  existingDetails:any[]=[];

  maxVal! : string ;
  duplicateMail:boolean=false;
  duplicateName:boolean=false;
  createForm ! : FormGroup;


id:string=this.data.id;
name: string=this.data.name;
email:string=this.data.email;
phone:string=this.data.phone;
dob : string=this.data.dob;

editForm = new FormGroup({
  nameControl : new FormControl(this.name,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
  emailControl : new FormControl(this.email,[Validators.required,Validators.pattern((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))]),
  phoneControl : new FormControl(this.phone,[Validators.required,Validators.minLength(6),Validators.maxLength(10),Validators.pattern('[0-9 ]*')]),
  dobControl : new FormControl(this.dob,[Validators.required])
});

employeeDetails! : MatTableDataSource<any>;

@ViewChild(MatSort) sort! : MatSort
@ViewChild(MatPaginator) paginator! : MatPaginator;
  
constructor(private _service : EmployeeService,public _notification : NotificationService ,
  public dialogRef: MatDialogRef<UpdateformComponent>,public dialog : MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any
)

{
  this.fillTable()
}
 

fillTable()
  {
      this._service.getEmployees().subscribe(data =>{
      this.existingDetails=data; 
    })
  }

cancel()
{
  this.dialogRef.close();
}

update()
{
  
  const namee = this.editForm.controls['nameControl'].value;
  const emaill = this.editForm.controls['emailControl'].value;
  const phonee = this.editForm.controls['phoneControl'].value;
  const dobb = this.editForm.controls['dobControl'].value;

   //find dublicates in name and email
  if(this.existingDetails[0])
      {
        for(let i=0;i<this.existingDetails.length;i++)
        {
          if(this.existingDetails[i]['id']==this.id)
          {
            continue;
          }
          else
          {
            if(emaill!.toString().trim()==this.existingDetails[i]['email'].toString().trim() || namee?.toString().trim().toLowerCase()==this.existingDetails[i]['name'].toString().trim().toLowerCase())
          {
            if(emaill!.toString().trim()==this.existingDetails[i]['email'].toString().trim() && namee?.toString().trim().toLowerCase()==this.existingDetails[i]['name'].toString().trim().toLowerCase())
            {
              this.duplicateMail=true;
              this.duplicateName=true;
              setTimeout(()=>{this.duplicateMail=false
                this.duplicateName=false},2000)

              return;
            }
            else if(emaill!.toString().trim()==this.existingDetails[i]['email'].toString().trim() && namee?.toString().trim().toLowerCase()!=this.existingDetails[i]['name'].toString().trim().toLowerCase())
            {
              this.duplicateMail=true;
              setTimeout(()=>{this.duplicateMail=false},2000)
              return;
            }
            else if(emaill!.toString().trim()!=this.existingDetails[i]['email'].toString().trim() && namee?.toString().trim().toLowerCase()==this.existingDetails[i]['name'].toString().trim().toLowerCase())
            {
              this.duplicateName=true;
              setTimeout(()=>{this.duplicateName=false},2000)
              return;
            }
          }
          }
        }          
      }
      if((this.duplicateMail==false && this.duplicateName==false) && (this.editForm.controls['nameControl'].valid && this.editForm.controls['emailControl'].valid && this.editForm.controls['phoneControl'].valid && this.editForm.controls['dobControl'].valid))
      {
        this._service.updateEmployee(this.id,namee!,emaill!,phonee!,dobb!).subscribe(data1=>
          {
            if(data1)
          {
              this._notification.success("updated successfully");   
          }
        });
      }
}

}
