import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      fullName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      avatar: new FormControl(''),
      role: new FormControl(''),
    });
  }

  async createNewUser(): Promise<void> {
    const newUser: User = {
      id: 0,
      fullName: this.userForm.get('fullName')?.value,
      email: this.userForm.get('email')?.value,
      address: this.userForm.get('address')?.value,
      password: this.userForm.get('password')?.value,
      phone: this.userForm.get('phone')?.value,
      avatar: this.userForm.get('avatar')?.value,
      role: this.userForm.get('role')?.value
    };
    try {
      await firstValueFrom(this.userService.createUser(newUser));
      this.router.navigate(['admin/user']);
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu người dùng', err);
    }
  }
}
