import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FetchAllItem} from "../model/FetchAllItem";
import {Product} from "../model/product";
import {FetchItem} from "../model/FetchItem";
import {User} from "../model/user";
import {UserUpdate} from "../model/userUpdate";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8081/api/v1/user';
  constructor(private http: HttpClient) { }

  getAllUser(): Observable<FetchAllItem<User>> {
    return this.http.get<FetchAllItem<User>>(this.url);
  }

  getUserById(id: number): Observable<FetchItem<User>> {
    return this.http.get<FetchItem<User>>(`${this.url}/${id}`);
  }

  createUser(user: User | undefined): Observable<FetchItem<User>> {
    return this.http.post<FetchItem<User>>(this.url, user);
  }

  updateUser(user: UserUpdate | undefined): Observable<FetchItem<UserUpdate>>{
    return this.http.put<FetchItem<UserUpdate>>(this.url, user);
  }

  deleteUser(id: number): Observable<FetchItem<User>> {
    return this.http.delete<FetchItem<User>>(`${this.url}/${id}`);
  }
}
