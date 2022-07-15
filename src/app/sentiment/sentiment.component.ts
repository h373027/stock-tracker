import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs';
import {StockDetailsService} from '../stock-details.service';
import {SentimentData} from '../sentiment-data';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  companyName: string = '';
  symbol: string = '';
  sentimentData: SentimentData | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private stockDetailsService: StockDetailsService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.companyName = state?.['companyName'];
    this.symbol = state?.['symbol'];
  }

  ngOnInit(): void {
    if (!this.symbol) {
      this.symbol = this.route.snapshot.url[1].path.toUpperCase();
    }

    if (!this.companyName) {
      this.stockDetailsService.getCompanyName(this.symbol)
        .pipe(first())
        .subscribe(companyName => this.companyName = companyName);
    }

    this.stockDetailsService.getSentimentData(this.symbol)
      .pipe(first())
      .subscribe(sentimentData => this.sentimentData = sentimentData);
  }

  goToStockList() {
    this.router.navigate(['/']);
  }
}
