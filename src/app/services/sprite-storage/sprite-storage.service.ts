import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const enum SpriteStorageErrorCode {
  NOT_FOUND = '404',
}
export const enum SpriteStorageErrorMessage {
  NOT_FOUND = 'Not Found.',
}

@Injectable({
  providedIn: 'root',
})
export class SpriteStorageService {
  constructor(private readonly http: HttpClient) {}
  readonly BASE_URL =
    'https://raw.githubusercontent.com/Joaovitorsw/poke-gifs/main/normal/';
  readonly EXTENSION = '.gif';

  getSpritePathByName(name: string): Observable<string> {
    const url = `${this.BASE_URL}${name}${this.EXTENSION}`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap((blob: Blob) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);

        if (blob.type === 'image/gif')
          return new Observable<string>((observer) => {
            fileReader.onload = () => {
              observer.next(fileReader.result as string);
              observer.complete();
            };
          });
        return of(SpriteStorageErrorMessage.NOT_FOUND);
      }),
      catchError((error: any) => {
        if (SpriteStorageErrorCode.NOT_FOUND)
          return of(SpriteStorageErrorMessage.NOT_FOUND);
        return of(error);
      })
    );
  }
}
