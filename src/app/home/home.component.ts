import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {BannerComponent} from "../banner/banner.component";
import {FeatureComponent} from "../feature/feature.component";
import {FooterComponent} from "../footer/footer.component";
import {ProductComponent} from "../product/product.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    FeatureComponent,
    FooterComponent,
    ProductComponent,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
