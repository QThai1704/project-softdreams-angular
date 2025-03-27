import {Component, Input, OnInit} from '@angular/core';
import {ProductItemComponent} from "./product-item/product-item.component";
import {NgForOf, NgStyle} from "@angular/common";
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {FetchAllItem} from "../model/FetchAllItem";
import {ResPagination} from "../model/paging-product";
import {FetchItem} from "../model/FetchItem";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductItemComponent, NgForOf, NgStyle],
  templateUrl: './product.component.html',
  styleUrls: ['../../styles.css', './product.component.css']
})
export class ProductComponent implements OnInit {
  resPagination : ResPagination<Product> | undefined;
  products: Product[] = [];
  page : number = 1;
  size : number = 4;
  totalPages : number = 0;
  totalRecords : number = 0;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProduct(this.page);
  }

  getProduct(number: number): void {
    debugger;
    this.productService.getAllProduct(number, this.size).subscribe({
      next: (response: FetchItem<ResPagination<Product>>) => {
        this.resPagination = response.data;
        this.products = this.resPagination.data;
        this.totalPages = this.resPagination.meta.pages;
        this.totalRecords = this.resPagination.meta.total;
      }, error: (error) => {
        console.error('Có lỗi khi lấy dữ liệu sản phẩm', error);
      }
    });
  }

  filterProduct(keyword: string): void {
    this.productService.filterProductByAsus(keyword).subscribe({
      next:(response: FetchAllItem<Product>) => {
        this.products = response.data;
      }, error: (error) => {
        console.error('Có lỗi khi lấy dữ liệu sản phẩm', error);
      }
    });
  }

  nextPage(): void {
    this.page++;
    this.getProduct(this.page);
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getProduct(this.page);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && (this.totalPages === 0 || page <= this.totalPages)) {
      this.page = page;
      this.getProduct(this.page);
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
