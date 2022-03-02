import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDService } from '../services/crud.service';
import { HttpClient } from '@angular/common/http';
declare const Swal: any;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
// @ts-ignore
 productForm: FormGroup
 productId: any
 buttonText = 'Create product';
 imageSrc: string = '';

  constructor(
      private crudService: CRUDService, 
      private formBuilder : FormBuilder, 
      private router: Router, 
      private activatedRoute : ActivatedRoute,
      private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.createProductForm();
    let productId = '';
    
    if(this.activatedRoute.snapshot.params['productId']){
      productId = this.activatedRoute.snapshot.params['productId'];

      if(productId !== ''){
        this.loadProductDetails(productId);
      }
    }
    
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      'name': ['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)])
      ],
      'description': ['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)])
      ],
      'price': ['',Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(8)])
      ],
      'file': ['']
      
    });
  }

  createProduct(values: any){
    //console.log(values);
    let formData = new FormData();
    
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    //formData.append('file', values.file);

    if(this.productId){
      
      formData.append('id', this.productId);
      this.crudService.updateProductDetails(formData).subscribe(res => {
        if(res.result === 'success'){
          Swal.fire({
            title: 'Product Updated Successfully',            
            confirmButtonText: 'Ok',
          }).then((result:any) => {           
            if (result.isConfirmed) {
              this.navigateTo('/crud/product-list')
            }
          })
          //this.navigateTo('/crud/product-list')
        }
      })
    }else{
      
      this.crudService.createProduct(formData).subscribe(res => {
        if(res.result === 'success'){
          Swal.fire({
            title: 'Product Created Successfully',            
            confirmButtonText: 'Ok',
          }).then((result:any) => {           
            if (result.isConfirmed) {
              this.navigateTo('/crud/product-list')
            }
          })
          //this.navigateTo('/crud/product-list')
        }
      });

      // const formDataImage = new FormData();
      // formDataImage.append('file', values.imageSrc);
      // console.log('ayush',formDataImage);
      //formDataImage.append('file', this.productForm.get('fileSource')?.value);
     
      // this.http.post('http://localhost/web_api/upload.php', formData)
      // .subscribe(res => {
      //   console.log(res);
      //   alert('Uploaded Successfully.');
      // })

    }

  }

  loadProductDetails(productId : any){
    this.buttonText = 'Update Product'
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productForm.controls['name'].setValue(res.p_name);
      this.productForm.controls['description'].setValue(res.p_description);
      this.productForm.controls['price'].setValue(res.p_price);
      this.productId = res.p_id;
      
    })
  }

  onFileChange(event:any) {
    //  const reader = new FileReader();
    
    // if(event.target.files && event.target.files.length) {
      
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    
    //   reader.onload = () => {   
    //     this.imageSrc = reader.result as string;
    //   };

    //   this.productForm.patchValue({
    //     fileSource: file
    //   });
   
    // }

    const file = event.target.files ?  event.target.files[0] : '';
    console.log(file);
    // this.productForm.patchValue({
    //       file: file
    // });
  }

  navigateTo(route: any) {
    this.router.navigate([route]);
  }

}
