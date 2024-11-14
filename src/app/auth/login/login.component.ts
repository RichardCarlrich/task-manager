import { Component, inject, signal, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error = signal<string>('');
  showPassword = signal<boolean>(false);
  loading = signal<boolean>(false);
  isLoading = computed(() => this.loading());

  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((state) => !state);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.setLoadingState(true);
    const data = this.getFormData();
    this.authService.login(data).subscribe({
      next: () => this.handleLoginSuccess(),
      error: (err) => this.handleLoginError(err),
    });
  }

  private setLoadingState(state: boolean): void {
    this.loading.set(state);
  }

  private getFormData(): { email: string; password: string } {
    return {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
  }

  private handleLoginSuccess(): void {
    this.setLoadingState(false);
    this.router.navigate(['/tasks']);
  }

  private handleLoginError(err: any): void {
    this.setLoadingState(false);
    console.error(err);
    this.error.set(err?.error?.message || 'An error occurred');
  }
}