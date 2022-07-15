import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {first} from 'rxjs';

import {QuoteData} from '../../models/quote-data';
import {StockDetailsService} from '../../services/stock-details.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  @Input() symbol: string = '';
  companyName: string = '';
  quoteData: QuoteData | undefined;

  constructor(private storageService: StorageService,
              private stockDetailsService: StockDetailsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.stockDetailsService.getCompanyName(this.symbol)
      .pipe(first())
      .subscribe(companyName => this.companyName = companyName);
    this.stockDetailsService.getQuoteDataModel(this.symbol)
      .pipe(first())
      .subscribe(quoteData => this.quoteData = quoteData);
  }

  onRemove() {
    this.storageService.removeSymbol(this.symbol);
  }

  goToSentiment() {
    this.router.navigate(['/sentiment', this.symbol], {state: {
      symbol: this.symbol,
      companyName: this.companyName
    }});
  }
}
