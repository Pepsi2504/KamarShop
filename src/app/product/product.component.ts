import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../shared/model/products.service";
import { Product } from '../shared/model/product';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  products$: Observable<Product[]>;

  constructor(private productService: ProductsService,private router:Router) { 

  }

  productArray = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(
      list => {
        this.productArray = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          }
        })
        console.log(this.productArray);
      }    
    );
  }

  public gotoProductDetails(url, id) {
    this.router.navigate([url, id]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!"+id);
      } else {
        console.log("Navigation has failed!");
      }
    });
}


}
