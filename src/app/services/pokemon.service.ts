import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Pokemon, PokemonMini} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {
  url = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {  }

  public getPokemons(): Observable<any> {
    return this.http
      .get<PokemonMini[]>(this.url)
      .pipe(
        map((data: any) => data.results),
        catchError(this.handleErrors)
      );
  }

  public getPokemonByUrl(url: string): Observable<any> {
    return this.http.get<Pokemon>(url).pipe(
      map(data => data),
      catchError(this.handleErrors)
    );
  }

  public getPokemonByType(type?: string): Observable<any> {
    return this.http.get<any>(this.url + 'type/' + (type ? type : '')).pipe(
      map(data => data?.pokemon ? data.pokemon.map(item => item.pokemon) : data.results),
      catchError(this.handleErrors)
    );
  }


  public getPokemonByHabitat(habitat?: string): Observable<any> {
    return this.http.get<any>(this.url + 'pokemon-habitat/' + (habitat ? habitat : '')).pipe(
      map(data => data?.pokemon_species ? data.pokemon_species : data.results),
      catchError(this.handleErrors)
    );
  }

  public getPokemonByLazyLoading(limit: number, skip: number): Observable<any> {
    return this.http
      .get<PokemonMini[]>(this.url + `pokemon?limit=${limit}&offset=${skip}`)
      .pipe(
        map((data: any) => data.results),
        catchError(this.handleErrors)
      );
  }

  private handleErrors(error: HttpErrorResponse) {
    const err = 'Something wrong!';
    if (error) {
      return throwError(
        error.error?.message ? error.error?.message : error.message
      );
    } else {
      return throwError(err);
    }
  }
}
