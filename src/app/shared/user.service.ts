import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserForRegistrationDto } from './user.model';
import { UserForAuthenticationDto } from './userAuth.model';
import { UserForAdminDto } from './userForAdmin.model';

@Injectable()
export class UserService {

  readonly rootUrl = 'http://localhost:56166';

  constructor(private http: HttpClient) { }

  registerUser(user : UserForRegistrationDto){
    const body: UserForRegistrationDto = {
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword      
    }
    return this.http.post(this.rootUrl + '/api/account/registration', body);
  }

  userAuthentication(body: UserForAuthenticationDto) {
    return this.http.post(this.rootUrl + '/api/account/login', body);
  } 

  roleMatch(allowedRoles: any[]): boolean {
    var isMatch = false;
    var userRoles: string = JSON.stringify(localStorage.getItem("userRole")!);
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
      else
      {
        return true;
      }
    });
    return isMatch;
  }

  refreshList(){
    return this.http.get<Array<UserForAdminDto>>(this.rootUrl+'/api/admin/getAll');
  }

  logout()
  {
    return this.http.get(this.rootUrl + '/api/account/logout');
  }
}
