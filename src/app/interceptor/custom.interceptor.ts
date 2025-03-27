import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {JwtService} from "../service/jwt.service";

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/login')) {
    return next(req);
  }
  const tokenService = inject(JwtService);
  const jwtToken = tokenService.getToken();
  console.log("Access token",jwtToken);
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${jwtToken}`,
    }
  })
  return next(cloneReq);
};
