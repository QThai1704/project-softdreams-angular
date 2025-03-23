import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Product} from "../../../../model/product";
import {ProductService} from "../../../../service/product.service";
import {firstValueFrom} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(private productService: ProductService, private router: Router) {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      detailDesc: new FormControl(''),
      shortDesc: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(''),
      quantity: new FormControl('')
    });
  }

  async createNewProduct(): Promise<void> {
    const product: Product = {
      id: 0,
      name: this.productForm.get('name')?.value,
      detailDesc: this.productForm.get('detailDesc')?.value,
      shortDesc: this.productForm.get('shortDesc')?.value,
      price: this.productForm.get('price')?.value,
      image: this.productForm.get('image')?.value,
      quantity: this.productForm.get('quantity')?.value
    };
    try {
      await firstValueFrom(this.productService.createProduct(product));
      this.router.navigate(['admin/product']);
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', err);
    }
  }
}
