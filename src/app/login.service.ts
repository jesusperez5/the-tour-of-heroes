import { Injectable } from '@angular/core';
import { usuarios } from './mock-usuarios';
import { Observable, map, of, tap } from 'rxjs';
import { Usuario } from './Usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

 
  getUser(name: string, contra: string): Observable<Usuario | undefined>{
    return of(usuarios.find(user => user.nombre === name && user.contraseña === contra));
  }

  comprobarUsuario(name: string, contraseña: string): Observable<boolean>{
      return this.getUser(name, contraseña).pipe(map(a => a !== undefined));
    }
}
