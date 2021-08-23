import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { UserForAuthenticationDto } from 'src/app/shared/userAuth.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(email: string,password: string){
    const userForAuth: UserForAuthenticationDto = {
      Email: email,
      Password: password
    }
     this.userService.userAuthentication(userForAuth)
     .subscribe((data : any)=>
     {
      localStorage.setItem('userToken',data.token);
      localStorage.setItem('userRole',data.role);
      this.router.navigate(['/home']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }  
}
