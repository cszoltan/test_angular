import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { MsalService } from './msal.service';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    access_token: string;

    constructor(private msalService: MsalService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(this.getAccessTokenFromCache()) {
			const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.access_token}`, 'Access-Control-Allow-Origin': '*' } });
            return next.handle(authReq);
		} else {
			throw "Access token does not exist for heroes app.";
		}
    }

    getAccessTokenFromCache(): boolean {
		if (sessionStorage.hasOwnProperty(this.msalService.B2CTodoAccessTokenKey) && sessionStorage[this.msalService.B2CTodoAccessTokenKey] !== "") {
			this.access_token = sessionStorage[this.msalService.B2CTodoAccessTokenKey];
			return true;
		} 
		return false;
	};
}
