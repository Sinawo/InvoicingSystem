import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LeadData } from 'src/app/home/data.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private leads: LeadData[] = [];
  private newLeadsCountSubject = new BehaviorSubject<number>(0);
  public newLeadsCount$: Observable<number> = this.newLeadsCountSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load initial leads data from the JSON file
    this.fetchLeadsData();
  }

  private apiUrl = 'http://localhost:3000/leadData'; // Replace with your API URL

  private fetchLeadsData() {
    // Load leads data from the JSON file using your API URL
    this.http.get<LeadData[]>(this.apiUrl).subscribe((data) => {
      this.leads = data;
      this.calculateNewLeadsCount();
    });
  }

  private calculateNewLeadsCount() {
    // Calculate new leads count based on the leads data (you may need to implement this logic)
    const newLeadsCount = this.leads.length; // Modify this logic as needed
    this.newLeadsCountSubject.next(newLeadsCount);
  }

  addLead(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  updateLead(leadId: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/${leadId}`;
    return this.http.put(url, updatedData);
  }

  deleteLead(leadId: number): Observable<any> {
    const url = `${this.apiUrl}/${leadId}`;
    return this.http.delete(url);
  }

  getLeads(): Observable<LeadData[]> {
    return this.http.get<LeadData[]>(this.apiUrl);
  }

  // Other methods to update and manage leads data
}
