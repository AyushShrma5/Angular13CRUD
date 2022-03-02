import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private httpClient : HttpClient) { }

  loadProducts() {
    const url = environment.API_Endpoint + 'view.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }
  
  createProduct(data: any): Observable<any> {
    const url = environment.API_Endpoint + 'create.php';
    return this.httpClient.post<any>(url, data).pipe(map(data => data));
  }

  loadProductInfo(productId:any): Observable<Product> {
    const url = environment.API_Endpoint + 'view_one.php?id=' + productId;
    return this.httpClient.get<Product>(url).pipe(map(data => data));
  }

  updateProductDetails(data: any): Observable<any> {
    console.log('a',data);
     const url = environment.API_Endpoint + 'update.php';
     return this.httpClient.post<any>(url, data).pipe(map(data => data));
  }

  deleteProduct(productId:any): Observable<any> {
    const url = environment.API_Endpoint + 'delete.php?id=' + productId;
    return this.httpClient.get<any>(url).pipe(map(data => data));
  }

  loadUsers() {
    const url = environment.API_Endpoint + 'all_users.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

}
