import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./home/home.component";
import { TaskComponent } from "./add-edit/add-edit.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { UserComponent } from "./user/user.component";

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'admin', component: AdminComponent,canActivate: [AuthGuard], data: { roles: ['Administrator'] } },
    { path: 'add', component: TaskComponent, canActivate: [AuthGuard]},
    { path: 'edit/:id', component: TaskComponent, canActivate: [AuthGuard]},
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'},
    
    
];