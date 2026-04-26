import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {

  form = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  });

  private readonly authService = inject(AuthService);
  private readonly router=inject(Router);

  async onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      if (username && password) {
        try {
          if (await this.authService.register(username, password)) {
            console.log('Registration successful');
            await this.router.navigate(['/tasks'],{ replaceUrl: true});
          }
        } catch (error) {
          console.error('Registration failed:', error);
        }
      } else {
        console.error('Username and password are required');
      }
    } else {
      console.error('Form is invalid');
    }
  }

}
