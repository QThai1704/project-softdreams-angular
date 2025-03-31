export interface Order {
  id: number;
  orderCode: string;
  totalPrice: number;
  receiverName: string | null;
  receiverAddress: string | null;
  receiverPhone: string | null;
  status: string;
  user: UserRes;
  orderDetails: OrderDetailRes[];
}

export interface UserRes {
  fullName: string;
  email: string;
}

export interface OrderDetailRes {
  id: number;
  quantity: number;
  price: number;
  product: ProductRes;
}

export interface ProductRes {
  id: number;
  name: string;
  price: number;
  image: string;
}
