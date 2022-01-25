import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const enum SpriteStorageErrorCode {
  NOT_FOUND = '404',
}
export const enum SpriteStorageErrorMessage {
  NOT_FOUND = 'Not Found.',
}

interface SpriteData {
  id: string | number;
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class SpriteStorageService {
  constructor(private readonly http: HttpClient) {}
  readonly BASE_URL =
    'https://raw.githubusercontent.com/Joaovitorsw/poke-gifs/main/normal/';
  readonly EXTENSION = '.gif';

  getSpritePathByName(name: string): Observable<string> {
    const url = `${this.BASE_URL}${name}${this.EXTENSION}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      untilDestroyed(this),
      map(() => url),
      catchError((error) => {
        if (error.status === 404)
          return of(SpriteStorageErrorMessage.NOT_FOUND);
        return of(error);
      })
    );
  }
}
