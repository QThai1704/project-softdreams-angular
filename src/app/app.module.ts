import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import {ProductService} from "./service/product.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./service/auth.service";
import {JwtService} from "./service/jwt.service";
import {RouterModule, RouterOutlet} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    FontAwesomeModule,
    RouterModule.forRoot([]),
    CommonModule
  ],
  providers: [
      provideHttpClient(withFetch()),
      ProductService,
      AuthService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtService,
        multi: true
      }
    ],
  bootstrap: []
})
export class AppModule { }
