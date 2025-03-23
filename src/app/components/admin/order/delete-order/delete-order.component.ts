import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductService} from "../../../../service/product.service";
import {firstValueFrom} from "rxjs";
import {OrderService} from "../../../../service/order.service";

@Component({
  selector: 'app-delete-order',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './delete-order.component.html',
  styleUrl: './delete-order.component.css'
})
export class DeleteOrderComponent {
  orderId: number | undefined;
  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute){}
  async deleteProductApi(): Promise<void> {
    try {
      this.orderId = Number(this.route.snapshot.paramMap.get('id'));
      await firstValueFrom(this.orderService.deleteOrder(this.orderId));
      this.router.navigate(['admin/order']);
    } catch (err) {
      console.error('Có lỗi khi xóa sản phẩm', err);
    }
  }
}
