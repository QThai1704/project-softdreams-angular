import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {FetchAllItem} from "../model/FetchAllItem";
import {FetchItem} from "../model/FetchItem";
import {ResPagination} from "../model/paging-product";
import {CartReq} from "../model/cart-req";
import {CartDetailList, CartDetailRes} from "../model/cart-detail-res";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8081/api/v1/admin/product';
  private filterUrl = 'http://localhost:8081/api/v1/filterProduct';

  constructor(private http: HttpClient) { }

  getAllProduct(page: number, size: number): Observable<FetchItem<ResPagination<Product>>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<FetchItem<ResPagination<Product>>>(this.url, { params });
  }

  getProductById(id: number): Observable<FetchItem<Product>> {
    return this.http.get<FetchItem<Product>>(`${this.url}/${id}`);
  }

  createProduct(product: Product | undefined): Observable<FetchItem<Product>> {
    return this.http.post<FetchItem<Product>>(this.url, product);
  }

  updateProduct(product: Product | undefined): Observable<FetchItem<Product>>{
    return this.http.put<FetchItem<Product>>(this.url, product);
  }

  deleteProduct(id: number): Observable<FetchItem<Product>> {
    return this.http.delete<FetchItem<Product>>(`${this.url}/${id}`);
  }

  filterProductByAsus(keyword: string): Observable<FetchAllItem<Product>> {
    return this.http.get<FetchAllItem<Product>>(this.filterUrl + '/' + keyword);
  }

  private addProToCartUrl = 'http://localhost:8081/api/v1/add-product-to-cart';
  addProToCart(cartReq: CartReq): Observable<FetchItem<CartReq>> {
    return this.http.post<FetchItem<CartReq>>(this.addProToCartUrl, cartReq);
  }

  private getCartUrl = 'http://localhost:8081/api/v1/cart';
  getCart(): Observable<FetchItem<CartDetailRes>> {
    return this.http.get<FetchItem<CartDetailRes>>(this.getCartUrl);
  }

  private deleteProInCartUrl = 'http://localhost:8081/api/v1/delete-cart-product';
  deleteProInCart(id: number): Observable<string> {
    let params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(this.deleteProInCartUrl,{}, {params, responseType: 'text'});
  }

  private handleCartDetailBeforeCheckoutUrl = 'http://localhost:8081/api/v1/confirm-checkout';
  handleCartDetailBeforeCheckout(cartDetailList: CartDetailList[]): Observable<string> {
    return this.http.post(this.handleCartDetailBeforeCheckoutUrl, cartDetailList, { responseType: 'text'});
  }

  private placeOrderUrl = 'http://localhost:8081/api/v1/place-order';
  placeOrder(receiverName: string, receiverAddress: string, receiverPhone: string, total: number): Observable<string> {
    let params = new HttpParams()
      .set('receiverName', receiverName.toString())
      .set('receiverAddress', receiverAddress.toString())
      .set('receiverPhone', receiverPhone.toString())
      .set('totalPrice', total.toString());
    return this.http.post(this.placeOrderUrl, {}, {params, responseType: 'text'});
  }


}
