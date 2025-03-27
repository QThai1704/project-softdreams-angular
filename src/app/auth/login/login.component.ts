import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {Login} from "../../model/login";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../../../styles.css', './login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  login : Login | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        if(response.data.user?.role?.name === 'ADMIN') {
          this.router.navigate(['admin']).then();
        }
        else {
          this.router.navigate(['']).then();
        }
      },
      error => {
        this.loginError = true;
        console.error('Login failed', error);
      }
    );
  }
}
