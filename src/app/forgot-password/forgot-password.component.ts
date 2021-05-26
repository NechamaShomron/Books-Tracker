import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  messageConfirmation = '';
  email = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  sendEmail(user: any) {
    if (user.email === '') {
      this.messageConfirmation = 'fill in your email';
      return;
    }
    this.authService.forgotPassword(user).subscribe((res: { result: string; }) => {
      if (res.result === 'success') {
        console.log("email sent");
        this.messageConfirmation = 'an email containing your password has been sent';
      }
      else if (res.result === 'fail') {
        this.messageConfirmation = 'The email you entered does not exist';
      }
    }, (err: any) => console.log(err));
  }
  goToLogin() {
    this.router.navigate(['/login']);

  }
}

