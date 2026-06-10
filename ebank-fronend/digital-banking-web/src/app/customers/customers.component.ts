import { CustomerService } from './../services/customer.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchformGroup: FormGroup | undefined;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchformGroup = this.fb.group({
      Keyword: this.fb.control(''),
    });

    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchformGroup?.value.Keyword;
    console.log(kw);
    this.customers = this.customerService.searchCustomer(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm(`Are you sure to delete ${c.name}?`);
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (resp) => {
        //console.log(data);
        //this.handleSearchCustomers();
        this.customers = this.customers.pipe(
          map((data) => {
            let index = data.indexOf(c);
            data.splice(index, 1);
            return data;
          })
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
