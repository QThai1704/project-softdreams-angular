import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FetchAllItem} from "../../../../model/FetchAllItem";
import {Product} from "../../../../model/product";
import {ProductService} from "../../../../service/product.service";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {ResPagination} from "../../../../model/paging-product";
import {FetchItem} from "../../../../model/FetchItem";

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    NgStyle
  ],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export class ShowProductComponent implements OnInit {
  resPagination : ResPagination<Product> | undefined;
  products : Product[] = [];
  page : number = 1;
  size : number = 5;
  totalPages : number = 0;
  totalRecords : number = 0;
  constructor(private productService: ProductService) {}
  fetchAllProducts(number: number): void {
    this.productService.getAllProduct(number, this.size).subscribe({
    next: (response: FetchItem<ResPagination<Product>>) => {
      this.resPagination = response.data;
      this.products = this.resPagination.data;
      this.totalPages = this.resPagination.meta.pages;
      this.totalRecords = this.resPagination.meta.total;
    },
    error: (error) => {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', error);
    }
    });
  }

  ngOnInit(): void {
    this.fetchAllProducts(this.page);
  }

  nextPage(): void {
    this.page++;
    this.fetchAllProducts(this.page);
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchAllProducts(this.page);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && (this.totalPages === 0 || page <= this.totalPages)) {
      this.page = page;
      this.fetchAllProducts(this.page);
    }
  }

  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}
