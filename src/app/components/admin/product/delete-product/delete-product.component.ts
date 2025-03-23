import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Product} from "../../../../model/product";
import {firstValueFrom} from "rxjs";
import {ProductService} from "../../../../service/product.service";

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  productId: number | undefined;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute){}
  async deleteProductApi(): Promise<void> {
    try {
      this.productId = Number(this.route.snapshot.paramMap.get('id'));
      await firstValueFrom(this.productService.deleteProduct(this.productId));
      this.router.navigate(['admin/product']);
    } catch (err) {
      console.error('Có lỗi khi xóa sản phẩm', err);
    }
  }
}
