import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        //console.log(data);
        this.authService.loadProfile(data);
        this.Router.navigateByUrl('/admin');
      },
      error: (err) => {
        console.log(err);
      },
    });
    //console.log(this.formLogin.value)
  }
}
