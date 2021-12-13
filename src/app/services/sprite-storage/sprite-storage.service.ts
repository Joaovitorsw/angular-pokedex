import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getDownloadURL, getStorage, ref } from '@firebase/storage';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const enum SpriteStorageErrorTypeMessage {
  NOT_FOUND = 'storage/object-not-found',
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
  constructor(private readonly firestore: FirebaseApp) {}

  getSpritePathByName(name: string): Observable<string> {
    const storage = getStorage(this.firestore);
    const spriteStorageRef = ref(
      storage,
      `pokemons-sprites/normal-sprites/${name}.gif`
    );
    const promise = getDownloadURL(spriteStorageRef);
    return from(promise).pipe(
      catchError((error: any) => {
        const options = [
          {
            available: error.code === SpriteStorageErrorTypeMessage.NOT_FOUND,
            message: SpriteStorageErrorMessage.NOT_FOUND,
          },
          {
            available:
              error.code === SpriteStorageErrorTypeMessage.QUOTA_EXCEEDED,
            message: SpriteStorageErrorMessage.QUOTA_EXCEEDED,
          },
        ];
        const errorOptions = options.find((option) => option.available);

        if (errorOptions?.available) return of(errorOptions.message);

        return of(error);
      })
    );
  }
}
