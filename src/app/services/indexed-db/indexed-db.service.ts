import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  constructor(private dbService: NgxIndexedDBService) {}

  getAll(storeName: string): Observable<any> {
    return this.dbService.getAll(storeName).pipe(catchError(() => of(false)));
  }

  getByKey(storeName: string, key: any): Observable<any> {
    return this.dbService.getByKey(storeName, key);
  }

  add(storeName: string, value: any, key?: any): Observable<any> {
    return this.dbService.add(storeName, value, key);
  }

  update(storeName: string, value: any, key?: any): Observable<any> {
    return this.dbService.update(storeName, value, key);
  }

  delete(storeName: string, key: string): Observable<Array<any>> {
    return this.dbService.delete(storeName, key);
  }

  clear(storeName: string): Observable<boolean> {
    return this.dbService.clear(storeName);
  }
}
