import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({   //décorateur pour marquer la classe comme un service injectable
  providedIn: 'root',
})
export class AuthService {

  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  constructor() {
      console.log('Auth Emulator Config:', this.auth);
      console.log('firestore Emulator Config:', this.firestore);
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User logged in:', userCredential.user);
      return userCredential.user !== null;
    }
    catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async register(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user !== null;
    }
    catch (error) {
      console.error('Registration error:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
}
