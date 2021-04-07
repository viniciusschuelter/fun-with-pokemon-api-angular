import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Character, Comic} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FiltersServiceService {
  apiKey: string = environment.apiKey;
  url = `https://gateway.marvel.com/v1/public/comics?${this.apiKey}`;
  urlChar = `https://gateway.marvel.com/v1/public/characters?${this.apiKey}`;

  constructor(private http: HttpClient) {
  }

  public getComicsByLazyLoading(limit: number, skip: number): Observable<any> {
    return this.http
      .get<Comic[]>(this.url + `&limit=${limit}&offset=${skip}`)
      .pipe(
        map((data: any) => {
          return this.mapResults(data);
        }),
        catchError(this.handleErrors)
      );
  }

  public getComicByTitle(title: string): Observable<any> {
    return this.http.get<Comic[]>(this.url + '&titleStartsWith=' + title).pipe(
      map((data: any) => {
        return this.mapResults(data);
      }),
      catchError(this.handleErrors)
    );
  }

  public orderComicByOption(option: string): Observable<any> {
    return this.http.get<Comic[]>(this.url + '&orderBy=' + option).pipe(
      map((data: any) => {
        return this.mapResults(data);
      }),
      catchError(this.handleErrors)
    );
  }

  public getComicsByQuantity(quantity: number): Observable<any> {
    return this.http.get<Comic[]>(this.url + '&limit=' + quantity).pipe(
      map((data: any) => {
        return this.mapResults(data);
      }),
      catchError(this.handleErrors)
    );
  }

  public getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.urlChar).pipe(
      map((data: any) => {
        return data.data.results.map((res) => {
          return {
            id: res.id,
            name: res.name,
            description: res.description,
            image: res.thumbnail.path.concat(
              '/portrait_medium.',
              res.thumbnail.extension
            ),
          };
        });
      }),
      catchError(this.handleErrors)
    );
  }

  public getCharactersByLazyLoading(
    limit: number,
    skip: number
  ): Observable<any> {
    return this.http
      .get<Comic[]>(this.urlChar + `&limit=${limit}&offset=${skip}`)
      .pipe(
        map((data: any) => {
          return data.data.results.map((res) => {
            return {
              id: res.id,
              name: res.name,
              description: res.description,
              image: res.thumbnail.path.concat(
                '/portrait_medium.',
                res.thumbnail.extension
              ),
            };
          });
        }),
        catchError(this.handleErrors)
      );
  }

  public getSingleCharacterComicsList(id: number): Observable<Comic[]> {
    return this.http
      .get<Comic[]>(
        `https://gateway.marvel.com/v1/public/characters/${id}/comics?${this.apiKey}`
      )
      .pipe(
        map((data: any) => {
          return this.mapResults(data);
        }),
        catchError(this.handleErrors)
      );
  }

  private mapResults(data) {
    return data.data.results.map((res) => {
      return {
        id: res.id,
        format: res.format,
        pageCount: res.pageCount,
        title: res.title,
        description: res.description,
        price: res.prices[0]?.price,
        date: res.dates[0]?.date,
        cover: res.thumbnail.path.concat(
          '/portrait_incredible.',
          res.thumbnail.extension
        ),
        owner: res.creators.items[0]?.name,
        condition: 'good',
        poster: res.images[0]?.path.concat('.', res.images[0].extension),
      };
    });
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
