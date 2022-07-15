import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit, OnDestroy {

  symbols: string[] = [];
  private subscription: Subscription | undefined;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.symbols = this.storageService.getSymbolsList();
    this.subscription = this.storageService.symbolsListChanged
      .subscribe(newList => this.symbols = newList);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
