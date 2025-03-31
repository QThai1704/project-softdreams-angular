import {Product} from "./product";

export interface CartDetailRes {
  cartDetailList: CartDetailList[];
  total: number;
  cartRes: CartRes;
}

export interface CartDetailList {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface CartRes {
  id: number;
  sum: number;
}
