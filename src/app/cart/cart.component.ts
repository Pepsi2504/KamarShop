import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/model/products.service';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productAddtoCart:any;

  isEmpty: boolean;

  totalPrice: any;

  constructor(private productService : ProductsService) { }

  ngOnInit() {
    this.productAddtoCart = this.productService.getProductfromCart();
    console.log(this.productAddtoCart);
    if(this.productAddtoCart == null){
      this.isEmpty = true;
    }else{
      this.isEmpty = false;
    }
    console.log(this.isEmpty);

    this.totalPrice = 0;
    for (var key in this.productAddtoCart) {
      if (this.productAddtoCart.hasOwnProperty(key)) {
         this.totalPrice = this.totalPrice + this.productAddtoCart[key].price*1;       
      }
      console.log(this.totalPrice);
    }
    
    
    // this.totalPrice = 

  }

}
