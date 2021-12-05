import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private baseUrl = "https://open-source-currency-api.herokuapp.com/currency"
  private baseUrl = "https://localhost:5001/currency";
  constructor(public http: HttpClient) { }

  public getAllCurrencies(): Observable<Currency[]>{    
    return this.http.get<Currency[]>(`${this.baseUrl}/currencies`);
  }

  public getCurrenciesComparison(currency: string): Observable<any>{    
    
    return this.http.get<any>(`${this.baseUrl}/comparison/${currency}`);
  }

  public downloadFile(currency: string): any{		
		return this.http.get(`${this.baseUrl}/comparison/download/${currency}`, {responseType: 'blob'});
   }
}
