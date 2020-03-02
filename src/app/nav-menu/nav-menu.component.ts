import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../services/register-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
title="IAM Product Novelis";
  constructor(private service:RegisterServiceService ,private route:Router,private auth:AuthService) { }

  ngOnInit(): void {
    if(!this.auth.checkStorage()){
      localStorage.clear();
      this.Logout();
    }
  }
Logout(){
  this.service.LogoutUsers().subscribe(succ=>{
    localStorage.removeItem('email');
    localStorage.removeItem('expire');
    localStorage.removeItem('role');

    this.route.navigate(['route']);

  },err=>console.log((err))

  );
}
isUserRegistrated(){
  const email=!!localStorage.getItem('email');
  const expire=!!localStorage.getItem('expire');

  const role=!!localStorage.getItem('role');

  if(email && expire  && role){
    return true;
  }
  return false;
}
}
