import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient : HttpClient) { }

  createUser(data: any): Observable<any> {
    const url = environment.API_Endpoint + 'signup.php';
    return this.httpClient.post<any>(url, data).pipe(map(data => data));
  }

}
