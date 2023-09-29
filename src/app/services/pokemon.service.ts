import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon, PokemonMini } from '../models/interfaces';
import { environment } from '../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { handleErrors } from '../utils/utils';

@Injectable({providedIn: 'root'})
export class PokemonService {
  url = environment.urlBase;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  public getPokemons(): Observable<PokemonMini[]> {
    return this.http.get<PokemonMini[]>(this.url + 'pokemon?&limit=9999').pipe(
      map((data: any) => data.results),
      catchError(handleErrors)
    );
  }

  public getPokemonByUrl(url: string): Observable<any> {
    return this.http.get<Pokemon>(url).pipe(
      map(data => data),
      catchError(handleErrors)
    );
  }

  public getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}pokemon/${name}`).pipe(
      map(data => data),
      catchError(handleErrors)
    );
  }

  public getPokemonByType(type?: string): Observable<any> {
    return this.http.get<any>(this.url + 'type/' + (type ? type : '')).pipe(
      map(data => data?.pokemon ? data.pokemon.map(item => item.pokemon) : data.results
      ),
      catchError(handleErrors)
    );
  }

  public getPokemonByHabitat(habitat?: string): Observable<any> {
    return this.http
      .get<any>(this.url + 'pokemon-habitat/' + (habitat ? habitat : ''))
      .pipe(
        map(data => data?.pokemon_species ? data.pokemon_species : data.results
        ),
        catchError(handleErrors)
      );
  }

  public getPokemonByLazyLoading(
    limit: number,
    skip: number
  ): Observable<any[]> {
    return this.http
      .get<PokemonMini[]>(this.url + `pokemon?limit=${limit}&offset=${skip}`)
      .pipe(
        map((data: any) => data.results),
        catchError(handleErrors)
      );
  }
}
