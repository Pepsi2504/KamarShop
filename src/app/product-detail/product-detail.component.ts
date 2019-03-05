import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/model/product';
import { ProductsService } from '../shared/model/products.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { appendFile } from 'fs';
import { $ } from 'protractor';
import { switchMap } from 'rxjs/operators';
import { FirebaseDatabase } from 'angularfire2';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetail$: AngularFireObject<any>
  detail: any;

  productArray = [];
  key$ :any;

  productAddtoCart : any;
  alerts=[];
  showSuccessMessageAdd: boolean;
  countItem: number;




  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
  ) {  }


  ngOnInit() {

    this.key$ = this.route.snapshot.paramMap.get('id');
    
    this.productService.detailProduct(this.key$).subscribe(item=>{
      this.detail=item;
      this.detail.key$ = this.key$;
      console.log(this.detail);
    });
    

    // return this.Object = this.productService.detailProduct(id).subscribe(
    //   list => {
    //     // this.productArray = list.map(item => {
    //     //   return{
    //     //     $key: item.key,
    //     //     ...item.payload.val()
    //     //   }
    //     this.Object = list;
    //     console.log(list);
    //   });
      

  }

  onAddCart(product:ProductsService){
    this.productAddtoCart = this.productService.getProductfromCart();
    if(this.productAddtoCart == null){
      this.productAddtoCart = [];
      this.productAddtoCart.push(product);
      this.productService.addProducttoCart(this.productAddtoCart);
      console.log(this.productAddtoCart);
      console.log("add new");
      this.showSuccessMessageAdd = true;
      setTimeout(() => this.showSuccessMessageAdd = false, 3000);
    }
    else{
      let tempProduct = this.productAddtoCart.find(p => p.key$ == product.key$);
      console.log(tempProduct);
      if(tempProduct == null){
        this.productAddtoCart.push(product);
        this.productService.addProducttoCart(this.productAddtoCart);
        console.log("add other");
        this.showSuccessMessageAdd = true;
        setTimeout(() => this.showSuccessMessageAdd = false, 3000);
      }
      else{
        console.log("add old");
      }
    }

    this.countItem = this.productAddtoCart.length;
    console.log(this.countItem);
  }
}


