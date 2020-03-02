import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private sirvice:CryptService) { }
   installStorage(rem:boolean,email:string){
        const day=new Date();
        if(rem){
          day.setDate(day.getDate()+10);
        }else{
          day.setMinutes(day.getMinutes()+1);
        }
        localStorage.setItem('email',this.sirvice.Encrypt(email));
        localStorage.setItem('expire',this.sirvice.Encrypt(day.toString()));
        this.GetRoleName(email).subscribe(success=>{
          localStorage.setItem('role',this.sirvice.Encrypt(success));
        },err=>
          console.log(err));
  }
  checkStorage(){
    if(!!localStorage.getItem('email') && localStorage.getItem('expire') && localStorage.getItem('role')){
 
      const email =this.sirvice.Decrypt( localStorage.getItem('email'));
      const expire =this.sirvice.Decrypt( localStorage.getItem('expire'));
      const role =this.sirvice.Decrypt( localStorage.getItem('role'));
       if(email!=null && expire!=null && role!=null ){
this.ValidateUser(email,role).subscribe(success=>{
  if(!this.IsExpiredDate(expire)){
    console.log('user autoriser');
    return true;
  }
 
},err=>
console.log(err))  ;     }
    }
   // const day=new Date();
   return false;
}
IsExpiredDate(day:string){
  const dateNow= new Date();
  const dateExpire=new Date(Date.parse(day));
  if(dateExpire<dateNow){
   // localStorage.clear();
    return true;
  }return false;
}
   GetRoleName(email:string){
    return this.http.get('http://localhost/58314/Account/GetRoleName/'+email,{responseType:'text'}).pipe();
  }

  ValidateUser(email:string,role:string ){
    return this.http.get('http://localhost/58314/Account/checkUserClaims/'+email+'&'+role,{withCredentials:true}).pipe();
  }
}
