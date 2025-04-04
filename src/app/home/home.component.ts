import { Component } from '@angular/core';
import {FeatureComponent} from "../feature/feature.component";
import {ProductComponent} from "../product/product.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FeatureComponent,
    ProductComponent,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
