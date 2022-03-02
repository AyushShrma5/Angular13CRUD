import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CRUDService } from '../crud/services/crud.service';
declare const Swal: any;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  // @ts-ignore
  loginForm: FormGroup
  users:any = [];

  constructor( private formBuilder : FormBuilder, private crudService: CRUDService, private router: Router ) { }

  ngOnInit(): void {
    this.createloginForm();
    this.crudService.loadUsers().subscribe(res => {
      this.users = res;
    })
  }

  createloginForm() {
    this.loginForm = this.formBuilder.group({
      'email': ['',Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.maxLength(30)])
      ],
      'password': ['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8)])
      ]
    });
  }

  loginUser(values: any){
    var valid_user = 'No';
      this.users.forEach((user:any) => {
        console.log(values);
        if(user.email === values.email && user.password === values.password){
          //console.log('login successfull');
          valid_user = 'Yes';
          // localStorage.setItem('isLoggedIn', "true");
          // console.log(localStorage.getItem('isLoggedIn'))
          // this.router.navigate(['crud/product-list'])
          // return
        }        
      });

      if(valid_user == 'Yes'){
        localStorage.setItem('isLoggedIn', "true");
        //console.log(localStorage.getItem('isLoggedIn'))
        //this.router.navigate(['crud/product-list'])
          
        Swal.fire({
          title: 'Login Successfully',            
          confirmButtonText: 'Ok',
        }).then((result:any) => {           
          if (result.isConfirmed) {
            this.router.navigate(['crud/product-list'])
          }
        })
          
      } else {
        Swal.fire({
          title: 'User not Valid, Try again !',            
          confirmButtonText: 'Ok',
        }).then((result:any) => {           
          if (result.isConfirmed) {
            this.router.navigate(['login'])
          }
        })
      }
 
    
  }

}
