import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Product} from "../../../../model/product";
import {ProductService} from "../../../../service/product.service";
import {FetchAllItem} from "../../../../model/FetchAllItem";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../model/user";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './show-user.component.html',
  styleUrl: './show-user.component.css'
})
export class ShowUserComponent implements OnInit {
  users : User[] = [];
  constructor(private userService: UserService) {}
  fetchAllUsers(): void {
    this.userService.getAllUser().subscribe((response: FetchAllItem<User>) => {
        this.users = response.data;
        console.log(response.data)
      },
      error => {
        console.error('Có lỗi khi lấy dữ liệu người dùng', error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchAllUsers();
  }
}
