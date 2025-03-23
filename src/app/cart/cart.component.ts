import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faMinus, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  iconMinus = faMinus;
  iconPlus = faPlus;
  iconTimes = faTimes;
}
