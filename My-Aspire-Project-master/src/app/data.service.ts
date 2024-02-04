import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LeadData, QuoteData } from './home/data.model';



@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL


  private leadsSubject = new BehaviorSubject<LeadData[]>([]);
  public leads$: Observable<LeadData[]> = this.leadsSubject.asObservable();


  constructor(private http: HttpClient) {}
  

  // Method to collect lead data and send it to the API
  collectLead(leadData: any) {
    const url = `${this.apiUrl}/leadData`;

    // Send a POST request to the lead endpoint with leadData
    return this.http.post(url, leadData);
  }


  //update the leads data
  updateLeadsData(leads: LeadData[]): void {
    this.leadsSubject.next(leads);
  }

  getLeads(): Observable<LeadData[]> {
    // Replace 'LeadData' with the actual type of your lead data
    return this.http.get<LeadData[]>(this.apiUrl);
  }
  // Method to store quote data and send it to the API
  storeQuote(quoteData: any) {
    const url = `${this.apiUrl}/quoteData`;

    // Send a POST request to the quote endpoint with quoteData
    return this.http.post(url, quoteData);
  }
}