import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ProductService} from "./service/product.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./service/auth.service";
import {JwtService} from "./service/jwt.service";

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
      ProductService,
      AuthService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtService,
        multi: true
      }
    ]
})
export class AppModule { }
