import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserForRegistrationDto } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { UserForAuthenticationDto } from '../shared/userAuth.model';
import { UserForAdminDto } from '../shared/userForAdmin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public users!: Array<UserForAdminDto>;

  constructor(
    public userService : UserService,
    private router: Router) { 
    this.users = new Array<UserForAdminDto>();
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.userService.refreshList().subscribe((data: Array<UserForAdminDto>) => {
      if(data != null)
      {        
        this.users = data;         
      }
       });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
