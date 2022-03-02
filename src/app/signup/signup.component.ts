import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from "../services/signup.service";
import { CRUDService } from '../crud/services/crud.service';
declare const Swal: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // @ts-ignore
  signupForm: FormGroup
  users:any = [];

  constructor(private signupService: SignupService, private formBuilder : FormBuilder,private router: Router,
    private crudService: CRUDService ) { }

  ngOnInit(): void {
    this.createsignupForm();
    this.crudService.loadUsers().subscribe(res => {
      this.users = res;
    })
  }

  createsignupForm() {
    this.signupForm = this.formBuilder.group(
      {
      'name': ['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)])
      ],

      'email': ['',Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.maxLength(30)])
      ],

      'mobile': ['',Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        Validators.minLength(10),
        Validators.maxLength(10)])
      ],

      'password': ['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8)])
      ],

      'confirmPassword': ['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8)])
      ]
    },
    {
      validator: this.mustMatch('password', 'confirmPassword'),
      Validator: this.uniqueEmail('email')
    }
    
    );
  }

  signupUser(values: any){
    let formData = new FormData();
    var valid_user = 'Yes';

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('password', values.password);
    console.log('loginUser',values);
    
    this.users.forEach((user:any) => {
      if(user.email == values.email){
        valid_user = 'No'
      } 
    });

    if(valid_user == 'Yes'){
      this.signupService.createUser(formData).subscribe(res => {
        //alert(res.result);
        if(res.result == 'success'){
          Swal.fire({
            title: 'User Created Successfully',            
            confirmButtonText: 'Ok',
          }).then((result:any) => {           
            if (result.isConfirmed) {
              this.navigateTo('/login')
            }
          })
          //this.navigateTo('/crud/product-list')
        }else{
          if(res.result === 'email_exist'){
            Swal.fire('Email Already Exist')
            this.navigateTo('/signup')
          }
        }
      });

    }else{
      Swal.fire('Email Already Exist')
      this.navigateTo('/signup')
    }

    

   }


   mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
      }
      if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      } else {
      matchingControl.setErrors(null);
    }
    }
  }

  uniqueEmail(controlEmail:any) {
    //alert('1234');
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlEmail];
      // if (controlEmail.errors && !controlEmail.errors['uniqueEmail']) {
      // return;
      // }
      if (control.value == 'a@mailinator.com') {
        alert('as');
        controlEmail.setErrors({ uniqueEmail: true });
      } else {
        alert('as12');
        controlEmail.setErrors(null);
    }
    }
  }

  

   navigateTo(route: any) {
    this.router.navigate([route]);
  }

}
