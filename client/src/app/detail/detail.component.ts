import { Component, OnInit, Input } from '@angular/core';
import { Item } from './../item';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() selected: Item;

  constructor() { }

  ngOnInit() {
  }

}
