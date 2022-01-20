import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class IndexedDbService {
  constructor(private dbService: NgxIndexedDBService) {}

  getAll(storeName: string): Observable<any> {
    return this.dbService.getAll(storeName).pipe(untilDestroyed(this));
  }

  getByKey(storeName: string, key: any): Observable<any> {
    return this.dbService.getByKey(storeName, key).pipe(untilDestroyed(this));
  }

  add(storeName: string, value: any, key?: any): Observable<any> {
    return this.dbService.add(storeName, value, key).pipe(untilDestroyed(this));
  }

  update(storeName: string, value: any, key?: any): Observable<any> {
    return this.dbService
      .update(storeName, value, key)
      .pipe(untilDestroyed(this));
  }

  delete(storeName: string, key: string): Observable<Array<any>> {
    return this.dbService.delete(storeName, key).pipe(untilDestroyed(this));
  }

  clear(storeName: string): Observable<boolean> {
    return this.dbService.clear(storeName).pipe(untilDestroyed(this));
  }
  clearAll() {
    return this.dbService.deleteDatabase().pipe(untilDestroyed(this));
  }
}
