import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare const Swal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'angular_crud_php_mysql';
  isLoggedIn:any = localStorage.getItem('isLoggedIn');
  

  constructor(private router: Router ) {
    console.log(this.isLoggedIn);
  }

  loggedIn() {
    if(localStorage.getItem('isLoggedIn')){
      return true;
    } else{
      return false;
    }
    
  }

  logout() {
    //localStorage.clear();
    Swal.fire({
      title: 'Logout Successfully',            
      confirmButtonText: 'Ok',
    }).then((result:any) => {           
      if (result.isConfirmed) {
        localStorage.removeItem('isLoggedIn');
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        this.router.navigate(['login'])
      }
    })
    
  }

}
