import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements OnInit {

  @Input() value: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
