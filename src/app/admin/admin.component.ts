import { Component, OnInit } from '@angular/core';

import { ProductsService} from "../shared/model/products.service";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private productService: ProductsService){ }

  submitted: boolean;
  showSuccessMessage: boolean;
  showDeleteMessage: boolean;
  searchText: string ="";



  formControls = this.productService.form.controls;

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
      }
    );
  }

  onDelete($key){
    if (confirm('Are you sure to delete this product??!')){
      this.productService.deleteProduct($key);
      this.showDeleteMessage = true;
      setTimeout(() => this.showDeleteMessage = false, 3000);

    }
  }

  onSubmit(){
    this.submitted = true;
    
    if(this.productService.form.valid){
      if(this.productService.form.get('$key').value == null)
        this.productService.insertProduct(this.productService.form.value);
      else
        this.productService.updateProduct(this.productService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.productService.form.reset();
    }
  }

  filterCondition(product){
    return product.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
