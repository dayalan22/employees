import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private _http : HttpClient) { }

  getEmployees() : Observable<any>
  {
    return this._http.get('https://e-details.onrender.com/employees');
  }

  saveEmployee(i1 : string, n1 : string,e1 : string, p1 : string, d1 : string):Observable<any>
  {
   return this._http.post<any>('https://e-details.onrender.com/employees',{
     id : i1,
     name : n1,
     email : e1,
     phone : p1,
     dob : d1}
     )
  }

  deleteEmployee(i1 : any) : Observable<any>
  {
   return this._http.delete('https://e-details.onrender.com/employees/'+i1)
  }
  updateEmployee(i1: string, n1 : string, e1 : string, p1 : string, d1 : any):Observable<any>
  {
    return this._http.put('https://e-details.onrender.com/employees/'+i1,{
      name : n1,
      email : e1,
      phone : p1,
      dob : d1
    })
  }

  saveId(id1:string):Observable<any>
  {
    return this._http.post('https://e-details.onrender.com/deleteIds',{id:id1})
  }

  getId():Observable<any>
  {
    return this._http.get('https://e-details.onrender.com/deleteIds')
  }
}