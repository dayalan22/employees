import { Component, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule,FormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { MaterialModule } from '../Materials/material/material.module';
import { Router, RouterModule } from '@angular/router'; 
import {NativeDateAdapter} from '@angular/material/core';
 


@Component({
  selector: 'app-create',
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [ReactiveFormsModule,CommonModule,MaterialModule,RouterModule,FormsModule,
    ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',

})

export class CreateComponent implements OnInit{
  arr:number[]=[];
  arr1:any[]=[];
  existingDetails:any[]=[];
  e1:emp[]=[];
  deletedIds:any[] = [];

  maxVal! : string ;
  duplicateMail:boolean=false;
  duplicateName:boolean=false;
  createForm ! : FormGroup;
  
  constructor(private route : Router,private _users : EmployeeService){}
 
  ngOnInit(): void {
    this.createForm = new FormGroup({
      email1 : new FormControl('', [Validators.required, Validators.pattern((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))]),
      name1 : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      phone1 : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10),Validators.pattern('[0-9 ]*')]),
      dob1 :  new FormControl('',[Validators.required]) 
    })
    this._users.getId().subscribe(data=>{this.deletedIds=data});  
    this.fillTable();
  }

  fillTable()
  {
    this._users.getEmployees().subscribe(data =>{
      this.existingDetails=data; 
    })
  }

  Onsave()
  { 
    this.duplicateName=false;
    this.duplicateMail=false;
    
    if(this.createForm.controls['name1'].value && this.createForm.controls['email1'].value && this.createForm.controls['phone1'].value)
    {
      const namee = this.createForm.controls['name1'].value;
      const emaill = this.createForm.controls['email1'].value;
      const phonee = this.createForm.controls['phone1'].value;
      const dobb = this.createForm.controls['dob1'].value;
      //find dublicates in name and email
      if(this.existingDetails[0])
      {
        for(let i=0;i<this.existingDetails.length;i++)
        {
          if(emaill.toString().trim()==this.existingDetails[i]['email'].toString().trim() || namee.toString().trim().toLowerCase()==this.existingDetails[i]['name'].toString().trim().toLowerCase())
          {
            if(emaill.toString().trim()==this.existingDetails[i]['email'].toString().trim() && namee.toString().trim().toLowerCase()==this.existingDetails[i]['name'].toString().trim().toLowerCase())
            {
              this.duplicateMail=true;
              this.duplicateName=true;
              setTimeout(()=>{this.duplicateMail=false
                this.duplicateName=false},2000)
              return;
            }
            else if(emaill.toString().trim()==this.existingDetails[i]['email'].toString().trim() && namee.toString().trim().toLowerCase()!=this.existingDetails[i]['name'].toString().trim().toLowerCase())
            {
              this.duplicateMail=true;
              setTimeout(()=>{this.duplicateMail=false},2000)
              return;
            }
            else if(emaill.toString().trim()!=this.existingDetails[i]['email'].toString().trim() && namee.toString().trim().toLowerCase()==this.existingDetails[i]['name'].toString().trim().toLowerCase())
            {
              this.duplicateName=true;
              setTimeout(()=>{this.duplicateName=false},2000)
              return;
            }
          }
        }
        //generate next employeeid
        for(let i=0;i<this.existingDetails.length;i++)
        {
          this.arr.push(this.existingDetails[i]['id'])
        }
        for(let i=0;i<this.deletedIds.length;i++)
        {
          this.arr1.push(this.deletedIds[i]['id'])
        }
        this.arr = this.arr.concat(this.arr1)
        this.maxVal = (Math.max(...this.arr)+1).toString();

      }
      else
      {
        this.maxVal="1001";        
      }

      if(this.duplicateMail==false && this.duplicateName==false && (this.createForm.controls['name1'].valid && this.createForm.controls['email1'].valid && this.createForm.controls['phone1'].valid && this.createForm.controls['dob1'].valid))
      {
        const originalDate = dobb;
        const parsedDate = new Date(originalDate);
        const dateString = parsedDate.toISOString();

        this._users.saveEmployee(this.maxVal,namee,emaill,phonee,dateString).subscribe(responsive=>
        this.e1.push(responsive))
        this.maxVal="";
        this.arr=[];
        alert("Saved Successfully");
        window.location.reload();
      }
    } 
  } 
}

class emp{
  name!:string;
  email!:string;
  phone!:string;
  dob!:string
}
