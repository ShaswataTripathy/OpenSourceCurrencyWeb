import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Currency } from './models/currency';
import { ApiService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'OpenSourceCurrencyWeb';
  currencies: Currency[] = [];
  currencySelected: string = '';
  currenciesPriceList: any;
  columnDefs: any;
  conversionDate: string = '';
  defaultColDef: any;
  gridApi: any;
  gridColumnApi: any;

  constructor(private apiService: ApiService) {
    this.currenciesPriceList = [];
  }

  ngOnInit() {
    this.apiService.getAllCurrencies().subscribe((x) => (this.currencies = x));
    this.columnDefs = [
      {
        field: 'currencyShortName',
        headerName: 'Currency',
        width: 600,
      },
      {
        field: 'exchangePrice',
        headerName: 'Exchange Price',
        width: 600,
      },
    ];
    this.defaultColDef = {
      filter: true,
      resizable: true,
      sortable: true,
    };
  }

  onChange(newValue: any) {
    this.currencySelected = newValue;
    this.gridApi.showLoadingOverlay();
    this.apiService
      .getCurrenciesComparison(this.currencySelected.trim())
      .subscribe((x) => {
        this.conversionDate = x.date;
        this.currenciesPriceList = x.currencyBasePriceList;
        this.gridApi.hideOverlay();
      });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
