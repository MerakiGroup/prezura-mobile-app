import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalDataService } from '../global-data-service/global-data-service';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(private globalDataService: GlobalDataService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthorizationHeaders(request));
  }

  private addAuthorizationHeaders(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.globalDataService.getAuthToken();
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }
}
