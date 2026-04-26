import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export const connexionGuard: CanActivateFn = (route, state) => {
  const auth=inject(Auth)
  const router = inject(Router);

  if (auth.currentUser === null) {
    router.navigate(['/login']);
    return false;
  }

  return true;

};

