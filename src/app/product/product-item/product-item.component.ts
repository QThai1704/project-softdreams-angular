import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {FetchItem} from "../../model/FetchItem";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FaIconComponent
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  iconBagShopping= faBagShopping;
  @Input() product: Product | undefined;

  constructor() {}
}
