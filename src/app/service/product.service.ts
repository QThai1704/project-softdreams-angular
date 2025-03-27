import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {FetchAllItem} from "../model/FetchAllItem";
import {FetchItem} from "../model/FetchItem";
import {ResPagination} from "../model/paging-product";
import {CartReq} from "../model/CartReq";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8081/api/v1/admin/product';
  private filterUrl = 'http://localhost:8081/api/v1/filterProduct';
  private addProToCartUrl = 'http://localhost:8081/api/v1/add-product-to-cart';
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

  addProToCart(cartReq: CartReq):  Observable<FetchItem<CartReq>> {
    return this.http.get<FetchItem<CartReq>>(this.addProToCartUrl, cartReq);
  }
}
