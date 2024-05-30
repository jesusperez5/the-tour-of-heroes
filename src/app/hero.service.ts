import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, catchError, map, tap} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuarios } from './mock-usuarios';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private logueado = false;

  private heroesUrl = 'api/heroes';

  estoyLogueado(): boolean {
    return this.logueado;
  }
  loguearse(): void {
    this.logueado = true;
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this,this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found heroes matching "${term}"`):
        this.log(`no heroes matching "${term}"`),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
    );
  }

  getUsuario(name: string, contraseña: string): boolean{
    if (usuarios.filter(user => user.usuario === name && user.contraseña === contraseña).length == 0) {
      return false;
    }
    return true;
  }
}

