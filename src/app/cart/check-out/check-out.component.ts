import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {CartDetailList} from "../../model/cart-detail-res";
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{
  isBrowser: boolean | undefined;
  cartDetailList: CartDetailList[] = [];
  shippingFee: number = 15000;
  total: number = 0;
  receiverName: string = "";
  receiverAddress: string = "";
  receiverPhone: string = "";
  constructor(private router: Router, private productService: ProductService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  directSuccess(){
    this.productService.placeOrder(this.receiverName, this.receiverAddress, this.receiverPhone, this.total).subscribe({
      next: success => {
        console.log("Đặt hàng thành công", success);
        sessionStorage.removeItem("cartDetailList");
        this.router.navigate(['../thanks']).then();
      },
      error: err => {
        console.log("Đặt hàng thất bại", err);
      }
    });
  }

  loadCartFromSessionStorage() {
    if (this.isBrowser){
      const storedCart = sessionStorage.getItem('cartDetailList');
      if (storedCart) {
        this.cartDetailList = JSON.parse(storedCart);
        console.log("Thông tin giỏ hàng", this.cartDetailList);
        this.total = this.cartDetailList.reduce((total, item) => {
          return total + (item.price * item.quantity);
        }, 0);
      }
    }
  }

  ngOnInit(): void {
    this.loadCartFromSessionStorage();
  }
}
