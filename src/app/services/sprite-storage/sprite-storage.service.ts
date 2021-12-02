import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getDownloadURL, getStorage, ref } from '@firebase/storage';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const enum SpriteStorageErrorTypeMessage {
  NOT_FOUND = 'storage/object-not-found',
}
export const enum SpriteStorageErrorMessage {
  NOT_FOUND = 'Not Found.',
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
        const hasError = error.code === SpriteStorageErrorTypeMessage.NOT_FOUND;
        if (hasError) return of(SpriteStorageErrorMessage.NOT_FOUND);
        return of(error);
      })
    );
  }
}
