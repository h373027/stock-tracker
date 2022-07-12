import {Component, Input, OnInit} from '@angular/core';
import {first} from 'rxjs';

import {QuoteData} from '../quote-data';
import {StockDetailsService} from '../stock-details.service';
import {StorageService} from '../storage.service';

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
              private stockDetailsService: StockDetailsService) {
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
}
