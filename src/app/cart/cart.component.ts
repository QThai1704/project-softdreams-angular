import {Component, Inject, OnInit, PLATFORM_ID, Injectable} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faMinus, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {isPlatformBrowser, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ProductService} from "../service/product.service";
import {CartDetailList} from "../model/cart-detail-res";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  iconMinus = faMinus;
  iconPlus = faPlus;
  iconTimes = faTimes;
  cartDetailList: CartDetailList[] = [];
  total: number = 0;
  isBrowser: boolean;
  shippingFee: number = 15000;
  cartDetailListInSession: CartDetailList[] = [];

  constructor(private router: Router, private productService: ProductService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getCartDetails(): void {
    this.productService.getCart().subscribe({
      next: (response: any) => {
        this.cartDetailList = response.data.cartDetailList;
        this.saveCartToSessionStorage();
        this.total = response.data.total;
      },
      error: err => {
        console.log("Lỗi lấy thông tin giỏ hàng: ", err);
      }
    })
  }

  loadCartFromSessionStorage() {
    if (this.isBrowser){
      const storedCart = sessionStorage.getItem('cartDetailList');
      if (storedCart) {
        this.cartDetailList = JSON.parse(storedCart);
      }
    }
  }

  saveCartToSessionStorage() {
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
  }

  increaseQuantity(cartDetail: any) {
    cartDetail.quantity++;
    this.saveCartToSessionStorage();
    this.calculateTotal();
  }

  decreaseQuantity(cartDetail: any) {
    if (cartDetail.quantity > 1) {
      cartDetail.quantity--;
      this.saveCartToSessionStorage();
      this.calculateTotal();
    }
  }

  ngOnInit(): void {
    this.loadCartFromSessionStorage();
    this.calculateTotal();
    if(this.cartDetailList.length === 0){
      this.getCartDetails();
    }
  }

  calculateTotal() {
    this.total = this.cartDetailList.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  deleteProInCartApi(id: number){
    this.productService.deleteProInCart(id).subscribe({
      next: () => {
        this.getCartDetails();
      },
      error: err => {
        console.log("Xảy ra loi khi xoa", err);
      }
    })
  }

  handleCartDetailBeforeCheckoutApi(): void {
    this.cartDetailListInSession = JSON.parse(<string>sessionStorage.getItem('cartDetailList'));
    this.productService.handleCartDetailBeforeCheckout(this.cartDetailListInSession).subscribe({
      next: (response: any) => {
        this.router.navigate(['../checkout']).then();
      },
      error: err => {
        console.log("Xảy ra lỗi khi xử lý giỏ hàng", err);
      }
    });
  }
}
