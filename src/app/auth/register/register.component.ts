import { Component } from '@angular/core';
import {RouterLink, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  lastName: string = '';
  firstName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  boolError: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    this.authService.register(this.firstName, this.lastName, this.email, this.password, this.confirmPassword).subscribe(
      response => {
        this.router.navigate(['/login']);
        console.log('Login successful', response);
        alert("Đăng ký thành công");
      },
      error => {
        this.boolError = true;
        this.errorMessage = error.message;
      }
    );
  }
}
