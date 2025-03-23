import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  userId: number | undefined;
  constructor(private userService:UserService, private router: Router, private route: ActivatedRoute){}
  async deleteUserApi(): Promise<void> {
    try {
      this.userId = Number(this.route.snapshot.paramMap.get('id'));
      await firstValueFrom(this.userService.deleteUser(this.userId));
      this.router.navigate(['admin/user']);
    } catch (err) {
      console.error('Có lỗi khi xóa người dùng', err);
    }
  }
}
