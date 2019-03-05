import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {FormControl, FormGroup, Validators} from "@angular/forms"

@Injectable({
  providedIn: 'root'
})
export class ProductsService { 

  constructor(private firebase: AngularFireDatabase) { }

  productList: AngularFireList<any>
  productDetail: AngularFireObject<any>

  isEdit: string = "Create";


  form = new FormGroup({
    $key: new FormControl(null),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image: new FormControl('',),
    quantity: new FormControl('', Validators.required),
  });

  getProducts(){
    this.productList = this.firebase.list('products');
    return this.productList.snapshotChanges();
  }
//this.firebase.list('products').snapshotChanges().subscribe( list => {this.productArray = list.map(item => {return{$key: item.key,...item.payload.val()}})});
  // getDetail(){
  //   this.productDetail = this.firebase.object('products/-LZ_BcgrpvHDL4tqPAv4');
  //   return this.productDetail.snapshotChanges();
  // }

  editForm(product){
    this.form.setValue(product);
  }

  insertProduct(product){
    this.productList.push({
      code: product.code,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      image: 'image.png',
      quantity: product.quantity
    });
  }

  updateProduct(product){
    this.productList.update(product.$key,{
      code: product.code,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      image: 'image.png',
      quantity: product.quantity
    });
  }

  deleteProduct($key: string){
    this.productList.remove($key);
  }

  detailProduct($key: any){
    this.productDetail = this.firebase.object('products/'+$key);
    return this.productDetail.valueChanges();
  }

  addProducttoCart(products:any){
    localStorage.setItem("product",JSON.stringify(products));
  }

  getProductfromCart(){
    return JSON.parse(localStorage.getItem("product"));
  }
 
}
