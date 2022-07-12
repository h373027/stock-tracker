import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  key = 'symbols-list';

  constructor() {
  }

  getSymbolsList(): string[] {
    let listAsString = localStorage.getItem(this.key);
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

  addSymbol(symbol: string): string[] {
    const list = this.getSymbolsList();
    list.push(symbol);
    this.setSymbolsList(list);
    return list;
  }

  removeSymbol(symbol: string): string[] {
    const list = this.getSymbolsList();
    const index = list.indexOf(symbol, 0);
    if (index > -1) {
      list.splice(index, 1);
    }
    this.setSymbolsList(list);
    return list;
  }
}
