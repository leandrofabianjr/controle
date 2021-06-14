import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  doLogin(): void {
    if (this.loginForm.invalid || !this.loginForm.touched) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      () => {
        console.log('Login deu bom!');
      },
      (error) => console.log(error)
    );
  }
}
