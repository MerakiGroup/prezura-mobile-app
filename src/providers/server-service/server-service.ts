import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

export const apiEndPoint = 'http://192.168.1.10:3000'; // chillies macbook endpoint

/**
 * Service representing ServerService.
 */
@Injectable()
export class ServerService {

    constructor(
        private http: HttpClient
    ) { }

    public getDisorderData(): Observable<any> {
        return this.http.get(`${apiEndPoint}/api/data/disorder`);
    }

}
