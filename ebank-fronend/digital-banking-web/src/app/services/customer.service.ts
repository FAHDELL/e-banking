import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  //backendHost: String = 'http://localhost:8085';
  constructor(private http: HttpClient) {}

  public getCustomer(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      environment.backendHost + '/customers'
    );
  }

  public searchCustomer(Keyword: string): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      environment.backendHost + '/customers/search?keyword=' + Keyword
    );
  }

  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      environment.backendHost + '/customers ',
      customer
    );
  }

  public deleteCustomer(id: number) {
    return this.http.delete(environment.backendHost + '/customers' + '/' + id);
  }
}
