import {Component, Input, OnInit} from '@angular/core';
import {MonthlySentimentData} from '../../models/sentiment-data';

@Component({
  selector: 'app-monthly-sentiment',
  templateUrl: './monthly-sentiment.component.html',
  styleUrls: ['./monthly-sentiment.component.css']
})
export class MonthlySentimentComponent implements OnInit {

  @Input() monthlySentimentData: MonthlySentimentData | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
