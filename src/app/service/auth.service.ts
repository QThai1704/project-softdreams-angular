import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8081/api/v1/auth/login';
  private registerUrl = 'http://localhost:8081/api/v1/auth/register';
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(this.loginUrl, body).pipe(
      tap((response: any) => {
        localStorage.setItem('accessToken', response.data.accessToken);
      })
    );
  }

  register(firstName: String, lastName: String, email: String, password: String, confirmPassword: String): Observable<any> {
    const body = {firstName, lastName, email, password, confirmPassword};
    return this.httpClient.post(this.registerUrl, body);
  }

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  // Lấy thông tin người dùng từ localStorage (nếu có)
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem('accessToken');
  }
}
