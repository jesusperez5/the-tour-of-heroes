import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HeroService } from '../hero.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  heroService = inject(HeroService);
  router = inject(Router);
  Usuario = 'usuario';
  contra = 'abc123.';
  credenciales;
  fallo = true;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.credenciales = this.formBuilder.group({
      nombre: '',
      contraseña: ''
    });
  }
  onSubmit() {
    if (this.heroService.getUsuario(this.credenciales.value.nombre?? "", this.credenciales.value.contraseña?? "")) {
      console.warn('Se han autentificado con exito', this.credenciales.value.nombre)
      this.heroService.loguearse();
      this.router.navigateByUrl('heroes')
    } else {
      this.fallo = false;
    } 
    this.credenciales.reset();
  }
}
