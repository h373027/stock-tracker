import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  @Input() symbol: string = '';

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
  }

  onRemove() {
    this.storageService.removeSymbol(this.symbol);
  }
}
