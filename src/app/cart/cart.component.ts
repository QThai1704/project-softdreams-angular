import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faMinus, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    NgStyle
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  iconMinus = faMinus;
  iconPlus = faPlus;
  iconTimes = faTimes;

  constructor(private router: Router) {
  }

  checkout(): void{
    this.router.navigate(['../checkout']).then();
  }
}
