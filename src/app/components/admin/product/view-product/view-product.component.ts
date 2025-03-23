import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductService} from "../../../../service/product.service";
import {Product} from "../../../../model/product";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit{
  productById : Product | undefined;
  productId: number | undefined;
  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  async fetchProductById(id: number): Promise<void> {
    try {
      const response = await firstValueFrom(this.productService.getProductById(id));
      this.productById = response.data;
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', err);
    }
  }

  async ngOnInit(): Promise<void> {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      await this.fetchProductById(this.productId);
    }
  }
}
