import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { RegisterModel } from 'src/app/models/register-model';
import { LoginModel } from 'src/app/models/login-model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private service:RegisterServiceService,
    private route:Router,private auth:AuthService) { }
    reg:RegisterModel;
message:string;
loginForm:FormGroup;
logModel:LoginModel;

  messageValidate={
    
    email:{
      required:'email required',
      
    },
    password:{
      required:'password  required',
      
      
    }
   
  };
  ngOnInit(): void {
    this.message='';
    this.logModel={
      
      email: '',
      password: '',
      rememberMe:false

    }
    this.loginForm=this.fb.group({
      
    email: ['',Validators.required],
    password: ['',Validators.required],
    rememberMe:false
  
  });
  }
  login(){
    if(this.loginForm.valid){
      this.ValidateModel();
      this.service.userLogin(this.logModel).subscribe(success=>{
         const rem=!!this.loginForm.value.rememberMe;
        // const day=new Date();
        // if(rem){
        //   day.setDate(day.getDate()+10);
        // }else{
        //   day.setMinutes(day.getMinutes()+30);
        // }
        // localStorage.setItem('email',this.loginForm.value.email);
        // localStorage.setItem('expire',day.toString());
        // this.service.GetRoleName(this.loginForm.value.email).subscribe(succ=>{
        //   localStorage.setItem('role',succ.toString());
        // },err=>
        //   console.log(err));
        const email=this.loginForm.value.email;
this.auth.installStorage(rem,email);
this.route.navigate(['home']);
      },err=>{
      console.log(err);
      this.message=err.error;
      
      });
    }}


    ValidateModel(){
    this.logModel.email=this.loginForm.value.email;
    this.logModel.password=this.loginForm.value.password;
    this.logModel.rememberMe=this.loginForm.value.rememberMe;

    }

  
}
