import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpMethod, LogService } from 'app/services/log/log.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const path = request.url;
    const payload = request.body;
    const method = request.method as HttpMethod;
    const headers = request.headers;

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const responseData = event.body;
          this.logService.logHttp(path, payload, responseData, method, headers);
        }
      })
    );
  }
}
