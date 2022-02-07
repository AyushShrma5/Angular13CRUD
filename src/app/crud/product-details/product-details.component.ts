import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { Product } from '../interfaces/product';
import { CRUDService } from '../services/crud.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // @ts-ignore
  productDetails : Product;

  constructor(private crudService: CRUDService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    let productId = '';
    
    if(this.activatedRoute.snapshot.params['productId']){
      productId = this.activatedRoute.snapshot.params['productId'];

      if(productId !== ''){
        this.loadProductDetails(productId);
      }
    }
  }


  loadProductDetails(productId : any){
   
    this.crudService.loadProductInfo(productId).subscribe(res => {
     
      this.productDetails = res
      
    })
  }

}
