import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Api {

  url: string = 'https://backend.happy-service.ml/';

  constructor(public http: HttpClient) { }

  /**
   * Standard get request
   * @param endpoint Name of the endpoint
   * @param params Request paramters
   * @param reqOpts Request options
   */
  get(endpoint: string, params?: any, reqOpts?: any): Observable<ArrayBuffer> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + endpoint, reqOpts);
  }

  /**
   * Standard post request
   * @param endpoint Name of the endpoint
   * @param body Body of the request
   * @param reqOpts Request options
   */
  post(endpoint: string, body: any, reqOpts?: any): Observable<ArrayBuffer> {
    return this.http.post(this.url + endpoint, body, reqOpts);
  }

  /**
   * Standard put request
   * @param endpoint Name of the endpoint
   * @param body Body of the request
   * @param reqOpts Request options
   */
  put(endpoint: string, body: any, reqOpts?: any): Observable<ArrayBuffer> {
    return this.http.put(this.url + endpoint, body, reqOpts);
  }

  /**
   * Standard delete request
   * @param endpoint Name of the endpoint
   * @param reqOpts Request options
   */
  delete(endpoint: string, reqOpts?: any): Observable<ArrayBuffer> {
    return this.http.delete(this.url + endpoint, reqOpts);
  }

  /**
   * Standard patch request
   * @param endpoint Name of the endpoint
   * @param body Body of the request
   * @param reqOpts Request options
   */
  patch(endpoint: string, body: any, reqOpts?: any): Observable<ArrayBuffer> {
    return this.http.patch(this.url + endpoint, body, reqOpts);
  }
}
