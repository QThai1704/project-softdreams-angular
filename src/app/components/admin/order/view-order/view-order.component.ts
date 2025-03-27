import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {OrderDetailRes} from "../../../../model/order";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {OrderService} from "../../../../service/order.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent implements OnInit {
  orderId: number | undefined;
  orderDetails: OrderDetailRes[] | undefined;
  constructor(private http: HttpClient, private orderService: OrderService, private route: ActivatedRoute) {}

  async fetchOrderDetail(id: number): Promise<void> {
    try {
      const response = await firstValueFrom(this.orderService.getOrderById(id))
      this.orderDetails = response.data.orderDetails;
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu order', err);
    }
  }
  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.orderId) {
      this.fetchOrderDetail(this.orderId).then();
    }
  }

}
