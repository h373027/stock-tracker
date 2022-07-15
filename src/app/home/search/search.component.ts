import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

interface SearchFilter {
  symbol: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
  }

  onSubmit(searchFilter: SearchFilter) {
    this.storageService.addSymbol(searchFilter.symbol);
  }
}
