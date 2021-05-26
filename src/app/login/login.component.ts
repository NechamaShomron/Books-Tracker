import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})

export class LoginComponent {
  messageConfirmation = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  onLogin(user: any) : any{
      this.authService.onLogin(user).subscribe((res: any) => {
        if (res.result === 'fail') {
          this.messageConfirmation = 'invalid name or password';
        } else {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        }

      }, (err: any) => console.log(err)

      );
    }
}
