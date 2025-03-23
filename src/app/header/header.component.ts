import {Component, ViewEncapsulation} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {faBagShopping, faUser, faSearch, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrls: ['../../styles.css', './header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  iconRightToBracket = faRightToBracket
  iconBag = faBagShopping;
  iconUser = faUser;
  iconSearch = faSearch;
  constructor(private authService : AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    return this.authService.logout();
  }
}
