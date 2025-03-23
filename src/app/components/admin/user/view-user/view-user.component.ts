import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {User} from "../../../../model/user";
import {UserService} from "../../../../service/user.service";
import {Role} from "../../../../model/role";

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit{
  userById : User | undefined;
  userId: number | undefined;
  role: Role | undefined;
  constructor(private userService: UserService, private route: ActivatedRoute) {}

  async fetchUserById(id: number): Promise<void> {
    try {
      const response = await firstValueFrom(this.userService.getUserById(id));
      this.userById = response.data;
      this.role = response.data.role as unknown as Role;
      console.log(typeof this.role);
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu người dùng', err);
    }
  }

  async ngOnInit(): Promise<void> {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      await this.fetchUserById(this.userId);
    }
  }
}
