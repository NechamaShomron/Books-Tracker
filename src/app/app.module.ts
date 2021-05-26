import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth.guard';
import {AuthService} from './services/auth.service';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BooksService } from './services/books.service';
import { AddBookComponent } from './add-book/add-book.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   RegisterComponent,
    ListComponent,
    ForgotPasswordComponent,
    AddBookComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard, AuthService, BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
