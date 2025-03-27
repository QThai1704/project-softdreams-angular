import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {BannerComponent} from "./banner/banner.component";
import {FeatureComponent} from "./feature/feature.component";
import {FooterComponent} from "./footer/footer.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCarSide} from "@fortawesome/free-solid-svg-icons";
import {ProductComponent} from "./product/product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css', '../main.css', './app.component.css', '../assets/admin/css/style-admin.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Laptop Shop';
  iconCarSide = faCarSide;
}
