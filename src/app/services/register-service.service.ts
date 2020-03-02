import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register-model';
import { Observable } from 'rxjs';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Users } from '../models/user';
import { FormGroup } from '@angular/forms';
import {LoginModel} from '../models/login-model';
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http:HttpClient) { }
  baseurl='http://localhost/58314/Account/';
  headers={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  };
  Register(reg:RegisterModel):Observable<RegisterModel>{
    return this.http.post<RegisterModel>(this.baseurl+'Register',reg,this.headers).pipe();
  }
  GetAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.baseurl+'GetAllUsers').pipe();
  }
  userLogin(log:LoginModel):Observable<LoginModel>{
    return this.http.post<LoginModel>(this.baseurl+'Login',log,this.headers).pipe();
  }
  LogoutUsers(){
    return this.http.get(this.baseurl+'Logout').pipe();
  }
  
}
