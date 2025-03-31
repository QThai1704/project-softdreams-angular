import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FetchAllItem} from "../model/FetchAllItem";
import {Order} from "../model/order";
import {FetchItem} from "../model/FetchItem";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Đường dẫn của admin
  private url = 'http://localhost:8081/api/v1/order';
  private orderDetailUrl = 'http://localhost:8081/api/v1/admin/order-detail';
  private downloadBillUrl = 'http://localhost:8081/api/v1/admin/report';

  constructor(private http: HttpClient) { }
  getAllOrder(): Observable<FetchAllItem<Order>> {
    return this.http.get<FetchAllItem<Order>>(this.url);
  }

  getOrderById(id: number): Observable<FetchItem<Order>> {
    return this.http.get<FetchItem<Order>>(this.url + '/' + id);
  }

  updateOrder(object: Object | undefined): Observable<FetchAllItem<Order>> {
    return this.http.put<FetchAllItem<Order>>(this.url, object);
  }

  deleteOrder(id: number): Observable<FetchAllItem<Order>> {
    return this.http.delete<FetchAllItem<Order>>(this.url + '/' + id);
  }

  downloadBill(id: number): void {
    this.http.get(this.downloadBillUrl + '/' + id, {
      responseType: 'blob'
    }).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);

        const link = document.createElement('a');
        link.href = url;
        link.download = `bill_${id}.pdf`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file:', error);
      }
    });
  }

  private getOrderByOrderCodeUrl = 'http://localhost:8081/api/v1/admin/order-code';
  getOrderByOrderCode(code: string): Observable<FetchAllItem<Order>> {
    let params = new HttpParams()
      .set('orderCode', code.toString());
    return this.http.get<FetchAllItem<Order>>(this.getOrderByOrderCodeUrl, {params});
  }
}
