import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Order, OrderDetailRes, UserRes} from "../../../../model/order";
import {OrderService} from "../../../../service/order.service";
import {firstValueFrom} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../../model/product";


@Component({
  selector: 'app-update-order',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.css'
})
export class UpdateOrderComponent implements OnInit {
  order: Order | undefined;
  orderId : number | undefined;
  orderForm: FormGroup;
  constructor(private orderService: OrderService, private route: ActivatedRoute, private router:Router) {
    this.orderForm = new FormGroup({
      id: new FormControl(''),
      receiverName: new FormControl({ value: '', disabled: true }),
      status: new FormControl(''),
    });
  }

  async fetchOrderByIdApi(id: number): Promise<void> {
    try {
      const reponse = await firstValueFrom(this.orderService.getOrderById(id));
      this.order = reponse.data;
      if (this.order) {
        this.orderForm.patchValue({
          id: this.order.id,
          receiverName: this.order.receiverName,
          status: this.order.status
        });
      }
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu order', err);
    }
  }

  async updateOrderApi(): Promise<void> {
    const order = {
      id: this.orderForm.get('id')?.value,
      status: this.orderForm.get('status')?.value,
    };
    try {
      await firstValueFrom(this.orderService.updateOrder(order));
      this.router.navigate(['admin/order']);
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', err);
    }
  }

  async ngOnInit(): Promise<void> {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.orderId) {
      await this.fetchOrderByIdApi(this.orderId);
    }
  }
}

