import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedIn = localStorage.getItem('isLogged') === "true";

  if(loggedIn){
    return true;
  }else{
    const router = inject(Router);
    router.navigateByUrl('/login');
    return false;
  }
};
