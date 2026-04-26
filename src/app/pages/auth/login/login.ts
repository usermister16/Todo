import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
})
export class Login {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  private readonly authService = inject(AuthService);
  private readonly router=inject(Router);

  async onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      const { username, password } = this.form.value;
      if (username && password) {
        try {
          if (await this.authService.login(username, password)) {
            console.log('Login successful');
            await this.router.navigate(['/tasks']);
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      } else {
        console.error('Username and password are required');
      }
    } else {
      console.error('Form is invalid');
    }
  }

}
