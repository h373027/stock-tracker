import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  key = 'symbols-list';
  symbolsListChanged = new EventEmitter<string[]>();

  constructor() {
  }

  getSymbolsList(): string[] {
    const listAsString = localStorage.getItem(this.key);
    if (listAsString) {
      return JSON.parse(listAsString);
    }
    return [];
  }

  private setSymbolsList(list: string[]) {
    if (list.length) {
      localStorage.setItem(this.key, JSON.stringify(list));
    } else {
      localStorage.removeItem(this.key);
    }
  }

  addSymbol(symbol: string) {
    if (!symbol) {
      return;
    }
    const list = this.getSymbolsList();
    if (list.indexOf(symbol) > -1) {
      return;
    }
    list.push(symbol.toUpperCase());
    this.setSymbolsList(list);
    this.symbolsListChanged.emit(list);
  }

  removeSymbol(symbol: string) {
    if (!symbol) {
      return;
    }
    const list = this.getSymbolsList();
    const index = list.indexOf(symbol);
    if (index > -1) {
      list.splice(index, 1);
    }
    this.setSymbolsList(list);
    this.symbolsListChanged.emit(list);
  }
}
