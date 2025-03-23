import {Component, Input, OnInit} from '@angular/core';
import {ProductItemComponent} from "./product-item/product-item.component";
import {NgForOf} from "@angular/common";
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {FetchItem} from "../model/FetchItem";
import {FetchAllItem} from "../model/FetchAllItem";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductItemComponent, NgForOf],
  templateUrl: './product.component.html',
  styleUrls: ['../../styles.css', './product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  page : number = 1;
  size : number = 4;
  totalPages = 0;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getAllProduct(this.page, this.size).subscribe((response: FetchAllItem<Product>) => {
      this.products = response.data;
      console.log(this.products);
    }, error => {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', error);
    });
  }

  filterProduct(keyword: string): void {
    this.productService.filterProductByAsus(keyword).subscribe((response: FetchAllItem<Product>) => {
      this.products = response.data;
      console.log(this.products);
    }, error => {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', error);
    });
  }

  nextPage(): void {
    this.page++;
    this.getProduct();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getProduct();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && (this.totalPages === 0 || page <= this.totalPages)) {
      this.page = page;
      this.getProduct();
    }
  }
}
