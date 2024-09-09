import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Router, RouterLink } from '@angular/router';
import { IProducts } from '../interfaces/IProduct';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {
  router = inject(Router);
  ProductList: IProducts[] = [];
  productservices = inject(ProductService);

  displayedColumns: string[] = [
    'productId',
    'productName',
    'productDescription',
    'productType',
    'action'
   
  ];
  ngOnInit() {
    this.getProductsFromServer();
  }
  getProductsFromServer() {
    this.productservices.getAllProducts().subscribe((result) => {
      this.ProductList = result;
      console.log(this.ProductList);
    });
  }
  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/product/' + id);
  }
  delete(id: number) {
    this.productservices.deleteProduct(id).subscribe(() => {
      console.log('deleted');
      // this.employeeList=this.employeeList.filter(x=>x.id!=id);
      this.getProductsFromServer();
      // this.toaster.success('Record deleted sucessfully');
    });
  }
}
 
