import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './home/search/search.component';
import {StockDetailsComponent} from './home/stock-details/stock-details.component';
import {SentimentComponent} from './sentiment/sentiment.component';
import { StocksListComponent } from './home/stocks-list/stocks-list.component';
import { MonthlySentimentComponent } from './sentiment/monthly-sentiment/monthly-sentiment.component';
import { ArrowComponent } from './shared/arrow/arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    StockDetailsComponent,
    SentimentComponent,
    StocksListComponent,
    MonthlySentimentComponent,
    ArrowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
