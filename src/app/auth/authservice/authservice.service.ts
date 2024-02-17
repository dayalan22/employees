import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authmodel } from '../authmodel/authmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private _http : HttpClient) { }
saveUsers(userdetails : Authmodel) : Observable<any>
{
  return this._http.post('https://e-details.onrender.com/users', userdetails);
}

getUsers() : Observable<any>
{
  return this._http.get('https://e-details.onrender.com/users');
}


}
