import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Comic} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  url = 'https://gateway.marvel.com/v1/public/comics';
  apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {
  }

  public getComics(): Observable<any> {
    return this.http
      .get<Comic[]>(this.url + '?' + this.apiKey + '&orderBy=title')
      .pipe(
        map((data: any) => {
          let list = data.data.results;

          list = list.map((res) => {
            return {
              id: res.id,
              format: res.format,
              pages: res.pageCount,
              title: res.title,
              price: res.prices[0].price,
              date: res.dates[0].date,
              owner: res.creators.items[0]?.name,
              cover: res.thumbnail.path.concat(
                '/portrait_incredible.',
                res.thumbnail.extension
              ),
              condition: 'good',
            };
          });
          return list;
        }),

        catchError(this.handleErrors)
      );
  }

  public getSingleComic(id: string): Observable<any> {
    return this.http.get<Comic>(this.url + `/${id}` + '?' + this.apiKey).pipe(
      map((data: any) => {
        const res = data.data.results[0];
        const character = {
          count: res.characters.available,
          items: res.characters.items,
        };
        this.getCharacter(character);
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
          characters: this.getCharacter(character),
          poster: res.images[0]?.path.concat('.', res.images[0].extension),
        };
      }),
      catchError(this.handleErrors)
    );
  }

  private async getCharacter(characters: {
    count: number;
    items: [{ name: string; resourceURI: string }];
  }) {
    if (characters.count > 0) {
      const listChars = this.replaceHttpByHttps(characters);
      characters.items;
      const charactersList = await this.fetchCharsInfos(listChars);
      const list = charactersList.map((item: any) => {
        const dataChar = item.data.results[0];
        return {
          name: dataChar.name,
          image: dataChar.thumbnail.path.concat(
            '.',
            dataChar.thumbnail.extension
          ),
        };
      });
      return list;
    } else {
      return;
    }
  }


  private fetchCharsInfos = async (char: any) => {
    try {
      const characters = await Promise.all(
        char.map(async (charUrl) => {
          const filmResponse = await fetch(
            charUrl.resourceURI + '?' + this.apiKey
          );
          const response = await filmResponse.json();
          return response;
        })
      );
      return characters;
    } catch (err) {
      console.log(err);
    }
  }

  private replaceHttpByHttps(characters: any) {
    characters.items
      .filter((item) => {
        return !item.resourceURI.includes('https');
      })
      .forEach((item) => {
        item.resourceURI = item.resourceURI.replace('http', 'https');
      });
    return characters.items;
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
