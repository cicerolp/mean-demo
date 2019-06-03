import { Component, OnInit } from '@angular/core';
import { ItemService } from './../item.service';
import { Item } from './../item';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  itens: Observable<Item[]>;
  private searchTerms = new Subject<string>();

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itens = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.itemService.selectCol('name', term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Item[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Item[]>([]);
      });
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
