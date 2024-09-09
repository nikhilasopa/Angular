
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../Services/product.service';
import { IProducts } from '../interfaces/IProduct';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-product-create',
  standalone: true,
  imports:[MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  formBuilder = inject(FormBuilder);
  Productservices = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster=inject(ToastrService);
  ProductForm = this.formBuilder.group({
    productName: ['', [Validators.required]],
    productDescription: ['', [Validators.required]],
    productType: ['', [Validators.required]],
  });
  ProductId!: number;
  isEdit = false;
  ngOnInit() {
    this.ProductId = this.route.snapshot.params['id'];
    if (this.ProductId) {
      this.isEdit = true;
      this.Productservices.getproduct(this.ProductId).subscribe((result) => {
        console.log(result);
        this.ProductForm.patchValue(result);
        // this.ProductForm.controls.email.disable();
      });
    }
  }
  save() {
    console.log(this.ProductForm.value);
    const product: IProducts = {
      productName: this.ProductForm.value.productName!,
      productDescription: this.ProductForm.value.productDescription!,
      productType: this.ProductForm.value.productType!,
    };

    if (this.isEdit) {
      product.productId=this.ProductId;
      this.Productservices
        .updateProduct(this.ProductId, product).subscribe(() => {
          console.log('success');
          // this.toaster.success("Record updated sucessfully.");
          this.router.navigateByUrl('/list');
        });
    } else {
      this.Productservices.createProduct(product).subscribe(() => {
        console.log('success');
        // this.toaster.success("Record added sucessfully.");
        this.router.navigateByUrl('/list');
      });
    }
  }
}

