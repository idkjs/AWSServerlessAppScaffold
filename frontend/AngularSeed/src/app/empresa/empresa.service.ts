import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, Subscription, from } from 'rxjs';
import { map, mergeMap, concatAll } from 'rxjs/operators';
import { Empresa } from './empresa.types';
import { ApiDefinition } from '../shared';
import { AuthService } from '../auth';

interface GraphqlResponse {
  data: { all: { items: [Empresa]}};
}

@Injectable({ providedIn: 'root' })
export class EmpresaService {

  private apiurl: ApiDefinition = {
    hostname: '/apigateway',
    stage: 'automated',
    resource: 'empresa'
  };

  private graphqlurl = {
    hostname: 'https://qf4s2hdz2fglrk3e6rnquaiqhu.appsync-api.us-east-1.amazonaws.com',
    resource: 'graphql'
  };

  private debugMode: boolean;

  constructor(private http: HttpClient, private authService: AuthService) { this.debugMode = true; }

  getById(empresaId: string): Observable<Empresa> {

    if (this.debugMode) { console.log('EmpresaService:getById(string):' + empresaId); }
    const url = this.parseUrl(this.apiurl) + '/' + empresaId;
    const options = { headers: this.headers() };
    return this.http.get<Empresa>(url, options);

  }

  getAll(): Observable<Empresa[]> {

    if (this.debugMode) { console.log('EmpresaService:getAll()'); }
    const url = this.parseUrl(this.graphqlurl);

    return new Observable<Empresa[]>(observer => {

      this.authService.idToken().toPromise().then(token => {

        console.log(token);

        const headers = new HttpHeaders({'Authorization': token, 'Content-Type': 'application/json; charset=utf-8'});
        const options = { headers: headers };
        const query = { query: 'query listEmpresas { all(nextToken: null) { items { itemId nome alias natureza } } }'};

        console.log(options);
        const parsed = this.http.post<GraphqlResponse>(url, query, options)
        .pipe(map(response => response.data.all.items));
        parsed.subscribe(values => { observer.next(values); });

      }).catch(error => {throw error; });

    });

  }

  private headers(): HttpHeaders {
    const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin', this.apiurl.hostname);
    // headers.append('Content-Type', 'application/json');
    return headers;
  }

  // private parseEmpresaArray(response: any): Empresa[] {

  //   console.log(response);
  //   const parsed = JSON.parse(response);

  //   const array = parsed['data']['all']['items'];
  //   if (array) {return array; } else { return []; }

  // }

  private parseEmpresaArray(response: any): Observable<Empresa[]> {

    console.log(response);
    const parsed = JSON.parse(response);

    const array = parsed['data']['all']['items'];
    if (array) {return from(array); } else { from([]); }

  }

  private parseUrl(api: ApiDefinition, resource?: string): string {

    let url = api.hostname;
    if (api.stage !== undefined) { url = url + '/' + api.stage; }
    if (api.resource !== undefined) { url = url + '/' + api.resource; }
    return url;

  }

}
