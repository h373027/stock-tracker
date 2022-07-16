import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() companyName: string = '';
  @Input() symbol: string = '';
  @Input() data: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
