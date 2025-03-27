import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8081/api/v1/auth/login';
  private registerUrl = 'http://localhost:8081/api/v1/auth/register';
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(this.loginUrl, body).pipe(
      tap((response: any) => {
        sessionStorage.setItem('accessToken', response.data.accessToken);
      })
    );
  }

  register(firstName: String, lastName: String, email: String, password: String, confirmPassword: String): Observable<any> {
    const body = {firstName, lastName, email, password, confirmPassword};
    return this.httpClient.post(this.registerUrl, body);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem('accessToken');
    }
    return false;
  }

  getUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
  }
}
