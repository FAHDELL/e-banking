import { CustomerService } from './../services/customer.service';
import { Customer } from './../model/customer.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css',
})
export class NewCustomerComponent {
  newCustomerFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
    });
  }

  handleSaveCustomer() {
    let Customer: Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(Customer).subscribe({
      next: (data) => {
        //console.log(data);
        alert('Customer saved successfully');
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl('/customers');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
