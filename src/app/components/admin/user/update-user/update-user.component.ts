import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {UserService} from "../../../../service/user.service";
import {Role} from "../../../../model/role";
import {UserUpdate} from "../../../../model/userUpdate";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  userById : User | undefined;
  userId: number | undefined;
  role1: Role | undefined;
  userForm: FormGroup;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      fullName: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      avatar: new FormControl(''),
      role: new FormControl(''),
    });
  }

  async updateUserApi(): Promise<void> {
    const user: UserUpdate = {
      id: this.userForm.get('id')?.value,
      fullName: this.userForm.get('fullName')?.value,
      email: this.userForm.get('email')?.value,
      address: this.userForm.get('address')?.value,
      phone: this.userForm.get('phone')?.value,
      avatar: this.userForm.get('avatar')?.value,
      role: this.userForm.get('role')?.value
    };
    try {
      console.log(user.role);
      console.log(typeof user.role);
      await firstValueFrom(this.userService.updateUser(user));
      this.router.navigate(['admin/user']);
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', err);
    }
  }

  async fetchUserById(id: number): Promise<void> {
    try {
      const response = await firstValueFrom(this.userService.getUserById(id));
      this.userById = response.data;
      this.role1 = this.userById.role as unknown as Role;
      if (this.userById) {
        this.userForm.patchValue({
          id: this.userById.id,
          fullName: this.userById.fullName,
          email: this.userById.email,
          phone: this.userById.phone,
          address: this.userById.address,
          avatar: this.userById.avatar,
          role: this.role1.name
        });
      }
    }
    catch (err) {
      console.error('Có lỗi khi cập nhật dữ liệu người dungf', err);
    }
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.fetchUserById(this.userId);
    }
  }
}
