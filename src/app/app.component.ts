import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Currency } from './models/currency';
import { ApiService } from './services/api-service.service';
import { saveAs } from 'file-saver';


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
    if(this.currencySelected.length>0){
    this.apiService
      .getCurrenciesComparison(this.currencySelected.trim())
      .subscribe((x) => {
        this.conversionDate = x.date;
        this.currenciesPriceList = x.currencyBasePriceList;
        this.gridApi.hideOverlay();
      });
    }
  }

  download() {
    if(this.currencySelected.length> 0){
      this.apiService.downloadFile(this.currencySelected).subscribe((response: any) => {
        let blob:any = new Blob([response], { type: 'text/csv; charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        
        
        saveAs(blob,`${this.conversionDate}_${this,this.currencySelected}.csv`);
        }), (error: any) => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
    }

	}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
