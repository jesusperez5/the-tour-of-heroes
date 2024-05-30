import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HeroService } from './hero.service';

export const permisosGuard: CanActivateFn = (route, state) => {
  const heroService = inject(HeroService);
  const router = inject(Router);
  
  if (heroService.estoyLogueado()) {
    return true;
  } 
  router.navigateByUrl('login')
  return false;
};


