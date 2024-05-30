import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HeroService } from '../hero.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  heroService = inject(HeroService);
  login = inject(LoginService)
  router = inject(Router);
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
    this.login.comprobarUsuario(this.credenciales.value.nombre?? "", this.credenciales.value.contraseña?? "").subscribe( usuario =>{
      if(usuario) {
        console.warn('Se han autentificado con exito', this.credenciales.value.nombre)
        this.heroService.loguearse();
        this.router.navigateByUrl('heroes');
      } else {
        this.fallo = false;
      }
      this.credenciales.reset();
    });
  }
}
