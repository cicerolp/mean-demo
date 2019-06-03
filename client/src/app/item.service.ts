import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Item } from './item';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class ItemService {

  constructor(private http: Http) {
    console.log('DB Service Initialized...')
  }

  selectAll(): Promise<Item[]> {
    return this.http.get('/api/select')
      .toPromise()
      .then(res => res.json() as Item[])
      .catch(this.handleError);
  }

  selectId(id: any): Promise<Item> {
    return this.http.get('/api/select/' + id)
      .toPromise()
      .then(res => res.json() as Item)
      .catch(this.handleError);
  }

  selectCol(col: string, value: any): Observable<Item[]> {
    return this.http.get('/api/select/' + col + '/' + value)
      .map(res => {
        return res.json() as Item[];
      });
  }

  insert(elt: Item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('/api/insert', JSON.stringify(elt), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(id: any, elt: Item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('/api/update/' + id, JSON.stringify(elt), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: any) {
    this.http.delete('/api/delete/' + id)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
