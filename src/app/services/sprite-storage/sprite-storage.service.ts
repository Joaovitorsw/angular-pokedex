import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const enum SpriteStorageErrorCode {
  NOT_FOUND = '404',
  QUOTA_EXCEEDED = 'storage/quota-exceeded',
}
export const enum SpriteStorageErrorMessage {
  NOT_FOUND = 'Not Found.',
  QUOTA_EXCEEDED = 'Quota Exceeded.',
}

@Injectable({
  providedIn: 'root',
})
export class SpriteStorageService {
  constructor(private readonly http: HttpClient) {}

  getSpritePathByName(name: string): Observable<string> {
    const url = `https://raw.githubusercontent.com/Joaovitorsw/poke-gifs/main/normal/${name}.gif`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap(({ size, type }: { size: number; type: string }) => {
        if (type === 'image/gif') return of(url);
        return of(SpriteStorageErrorMessage.QUOTA_EXCEEDED);
      }),
      catchError((error: any) => {
        const options = [
          {
            available: error.status == SpriteStorageErrorCode.NOT_FOUND,
            message: SpriteStorageErrorMessage.NOT_FOUND,
          },
        ];
        const errorOptions = options.find((option) => option.available);

        if (errorOptions?.available) return of(errorOptions.message);

        return of(error);
      })
    );
  }
}
