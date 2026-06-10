import { AccountsService } from './../services/accounts.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountDetails } from '../model/account';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-accounts',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent {
  acccountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationFromGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.acccountFormGroup = this.fb.group({
      accountId: this.fb.control(''),
    });
    this.operationFromGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null),
    });
  }

  handleSearchAccount() {
    let accountsId = this.acccountFormGroup.value.accountId;
    this.accountObservable = this.accountsService.getAccount(
      accountsId,
      this.currentPage,
      this.pageSize
    );
  }

  gotopage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accounId: string = this.acccountFormGroup.value.accountId;
    let operationType = this.operationFromGroup.value.operationType;
    let amount: number = this.operationFromGroup.value.amount;
    let description: string = this.operationFromGroup.value.description;
    let accountDestination: string =
      this.operationFromGroup.value.accountDestination;
    if (operationType == 'DEBIT') {
      this.accountsService.debit(accounId, amount, description).subscribe({
        next: (data) => {
          //console.log(account);
          this.handleSearchAccount();
          alert('Account debited successfully');
        },
        error: (error) => {
          alert('Account debited unsuccessfully');
          console.log(error);
        },
      });
    } else if (operationType == 'CREDIT') {
      this.accountsService.credit(accounId, amount, description).subscribe({
        next: (data) => {
          //console.log(account);
          this.handleSearchAccount();
          alert('Account credited successfully');
        },
        error: (error) => {
          alert('Account credited unsuccessfully');
          console.log(error);
        },
      });
    } else if (operationType == 'TRANSFER') {
      this.accountsService
        .transfer(accounId, accountDestination, amount, description)
        .subscribe({
          next: (data) => {
            //console.log(account);
            this.handleSearchAccount();
            alert('Account transferred successfully');
            this.handleSearchAccount();
          },
          error: (error) => {
            alert('Account transferred unsuccessfully');
            console.log(error);
          },
        });
    }
  }
}
