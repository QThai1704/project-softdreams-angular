import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof localStorage !== 'undefined') {
      const jwtToken = localStorage.getItem('accessToken');
      console.log(jwtToken);
      if (jwtToken != null) {
        request = request.clone({ setHeaders: { Authorization: `Bearer ${jwtToken}`, }, });
      }
    }
    return next.handle(request);
  }
}
