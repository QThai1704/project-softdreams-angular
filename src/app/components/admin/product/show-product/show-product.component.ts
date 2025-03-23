import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FetchAllItem} from "../../../../model/FetchAllItem";
import {Product} from "../../../../model/product";
import {ProductService} from "../../../../service/product.service";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export class ShowProductComponent implements OnInit {
  products : Product[] = [];
  page : number = 1;
  size : number = 5;
  totalPages = 0;
  constructor(private productService: ProductService) {}
  fetchAllProducts(): void {
    this.productService.getAllProduct(this.page, this.size).subscribe(
      (response: FetchAllItem<Product>) => {
        this.products = response.data;
      },
      error => {
        console.error('Có lỗi khi lấy dữ liệu sản phẩm', error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  nextPage(): void {
    this.page++;
    this.fetchAllProducts();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchAllProducts();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && (this.totalPages === 0 || page <= this.totalPages)) {
      this.page = page;
      this.fetchAllProducts();
    }
  }
}
