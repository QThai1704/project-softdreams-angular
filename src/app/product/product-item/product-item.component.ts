import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {FetchItem} from "../../model/FetchItem";
import {Observable} from "rxjs";
import {AsyncPipe, DecimalPipe, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons";
import {CartReq} from "../../model/cart-req";


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FaIconComponent,
    DecimalPipe
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  iconBagShopping= faBagShopping;
  @Input() product: Product | undefined;

  constructor(private productService: ProductService) {}

  addProToCartApi(productId: number | undefined, quantity: number, sum: number): void {
    const cartReq: CartReq = {
      productId: productId,
      quantity: quantity,
      sum: sum
    };
    this.productService.addProToCart(cartReq).subscribe({
      next: (response: FetchItem<CartReq>) => {
        console.log(response);
        alert("Thêm vào giỏ hàng thành công");
        sessionStorage.removeItem("cartDetailList");
      },
      error: err => {
        console.log("Lỗi thêm vào giỏ hàng: ", err);
      }
    });
  }
}
