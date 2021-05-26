import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';

import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddBookComponent } from './add-book/add-book.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
  },

  {
  path: 'login',
  component: LoginComponent
},
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
  path: 'list',
  component: ListComponent,
  canActivate: [AuthGuard]
},
{
  path: 'add-book',
  component: AddBookComponent,
  canActivate: [AuthGuard]
},
{
  path: 'forgotPassword',
  component: ForgotPasswordComponent,
},

  { path: '**', redirectTo: '' }

];
@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
 })
export class AppRoutingModule{}



