import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import{RegisterModel} from 'src/app/models/register-model';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { Users } from 'src/app/models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private service:RegisterServiceService) { }
  userForm:FormGroup;
  reg:RegisterModel;
  regex:RegExp;
  users:Users[]; 
  message:string;
  messageValidate={
    userName:{
      required:'enter userName', 
      matchuserName:'',
    },
    email:{
      required:'email required',
      notValid:'email non valide',
      matchEmail:''
    },
    password:{
      required:'password  required',
      minLength:'min length 6',
      notMatch:'le mot de passe doit contenir une lettre majiscule-min-nombre',
      
      
    },
    passwordConfirm:{
      required:'confirm password  required',
      minLength:'min length 6',
      isMatch:'not same' 
    }
  };
  ngOnInit(): void {
    this.message='';
    this.users=[];
    this.reg={
      userName:'',
      email: '',
      password: ''

    }
   this.userForm=this.fb.group({
      userName:['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    passwordConfirm: ['',[Validators.required,Validators.minLength(6)]]
  });
  this.allUsers();
  }
register(){
  if(this.userForm.valid){
    this.validateRegisterModel();
 this.service.Register(this.reg).subscribe(
   succes=>{
    this.message='registration done succesfully';
    this.userForm.reset();
    this.userForm.value.password='';
   },err=>console.log(err)

 );
  }

}

validateRegisterModel(){
  this.reg.userName=this.userForm.value.userName;
  this.reg.email=this.userForm.value.email;
  this.reg.password=this.userForm.value.password;
}
isPasswordMatch(){
  if(this.userForm.value.password!=='' && this.userForm.value.passwordConfirm!==''){
  if((this.userForm.value.password!==this.userForm.value.passwordConfirm)  && 
  (this.userForm.value.password.length>5 &&  this.userForm.value.passwordConfirm.length >5)){
    return true;
  }
}
  else return false;
}
isPasswordValid (){
  const pass=this.userForm.value.password;
  if(pass !=='' && pass.length>5){
 // if(!pass.match(/[\d(a-z)A-Z!@#$%^&*()_+]/))
 this.regex=new RegExp('[a-z]');
 if(!this.regex.test(pass)){
   this.messageValidate.password.notMatch='le mot de passe doit contenir au minimum une lettre min';
 
    return false;
  }


  this.regex=new RegExp('[A-Z]');
 if(!this.regex.test(pass)){
   this.messageValidate.password.notMatch='le mot de passe doit contenir au minimum une lettre majiscule';
 
    return false;
  }
  this.regex=new RegExp('[!@#$%^&*()_+{}<>]');
 if(!this.regex.test(pass)){
   this.messageValidate.password.notMatch='le mot de passe doit contenir au minimum une lettre SPECIALE';
 
    return false;
  }
  this.regex=new RegExp('[0-9]');
  // const num=parseInt(pass,9);
 if(!this.regex.test(pass)){
   this.messageValidate.password.notMatch='le mot de passe doit contenir au minimum un nombre';
 
    return false;
  }
  }
  return true;
}
allUsers(){
  this.service.GetAllUsers().subscribe(list=>
    {this.users=list;
      
    },err=>alert(err.error));
}
isUserNameExist(){
  for(const name of this.users){
    const username=this.userForm.value.userName;
    if(name.userName===username){
    this.messageValidate.userName.matchuserName='nom deja utilise';
    return true;
    }
  }
  return false;
}
isEmailExist(){
  for(const email of this.users){
    const mail=this.userForm.value.email;

    if(email.email===mail){
    this.messageValidate.email.matchEmail='mail deja utilise';
    return true;
    }
  }

return false;
}
}