import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Order} from "../../../../model/order";
import {OrderService} from "../../../../service/order.service";
import {firstValueFrom} from "rxjs";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-show-order',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    FormsModule
  ],
  templateUrl: './show-order.component.html',
  styleUrl: './show-order.component.css'
})
export class ShowOrderComponent implements OnInit{
  orders : Order[] = [];
  constructor(private orderService : OrderService ) {}

  async fetchAllOrder(): Promise<void> {
    try {
      const reponse = await firstValueFrom(this.orderService.getAllOrder());
      this.orders = reponse.data;
      console.log(this.orders);
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu order', err);
    }
  }

  downloadBillApi(orderId: number): void {
    this.orderService.downloadBill(orderId);
  }

  async ngOnInit(): Promise<void> {
    await this.fetchAllOrder();
  }
}
