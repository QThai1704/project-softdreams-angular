import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../../../service/product.service";
import {Product} from "../../../../model/product";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  productById : Product | undefined;
  productId: number | undefined;
  productForm: FormGroup;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      detailDesc: new FormControl(''),
      shortDesc: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(''),
      quantity: new FormControl('')
    });
  }

  async updateProductApi(): Promise<void> {
    const product: Product = {
      id: this.productForm.get('id')?.value,
      name: this.productForm.get('name')?.value,
      detailDesc: this.productForm.get('detailDesc')?.value,
      shortDesc: this.productForm.get('shortDesc')?.value,
      price: this.productForm.get('price')?.value,
      image: this.productForm.get('image')?.value,
      quantity: this.productForm.get('quantity')?.value
    };
    try {
      await firstValueFrom(this.productService.updateProduct(product));
      this.router.navigate(['admin/product']);
    } catch (err) {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', err);
    }
  }

  async fetchProductById(id: number): Promise<void> {
    try {
      const response = await firstValueFrom(this.productService.getProductById(id));
      this.productById = response.data;
      if (this.productById) {
        this.productForm.patchValue({
          id: this.productById.id,
          name: this.productById.name,
          detailDesc: this.productById.detailDesc,
          shortDesc: this.productById.shortDesc,
          price: this.productById.price,
          image: this.productById.image,
          quantity: this.productById.quantity
        });
      }
    }
    catch (err) {
      console.error('Có lỗi khi lấy dữ liệu sản phẩm', err);
    }
  }

  async ngOnInit(): Promise<void> {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      await this.fetchProductById(this.productId);
    }
  }
}
