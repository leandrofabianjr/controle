import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private toUrl: string = '/';

  errorMessage?: string;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.toUrl = this.route.snapshot.queryParams['to'] || '/';
  }

  doLogin(): void {
    if (this.loginForm.invalid || !this.loginForm.value) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      () => this.router.navigate([this.toUrl]),
      (error) => {
        console.log(error);
        this.errorMessage = error?.error?.message;
      }
    );
  }
}
