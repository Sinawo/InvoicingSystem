import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { BehaviorSubject, Observable } from 'rxjs';
import { LeadData } from 'src/app/home/data.model';
@Injectable({
  providedIn: 'root'
})




export class LeadService {
  private leads: any[] = [];
  private newLeadsCountSubject = new BehaviorSubject<number>(0);
  public newLeadsCount$: Observable<number> = this.newLeadsCountSubject.asObservable();

  constructor(private http: HttpClient, private _http:HttpClient) {
    // Load initial leads data from the JSON file
    this.fetchLeadsData();

  }





  public fetchLeadsData() {
    // Load leads data from the JSON file in assets
    this.http.get<any>('../db.json').subscribe(data => {
      this.leads = data.leadData;
      this.calculateNewLeadsCount();
    })
  }

  private calculateNewLeadsCount() {
    // Calculate new leads count based on the leads data
    const newLeadsCount = this.leads.filter(lead => lead.isNew).length;
    this.newLeadsCountSubject.next(newLeadsCount);
  }

  addLead(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/leadData',data);
  }

  updateLead(leadId:number,updatedData:any):Observable<any>{
    const url = `http://localhost:3000/leadData/${leadId}`;
    return this._http.put(url,updatedData);
  }

  deleteLead(leadId:number):Observable<any>{
    const url = `http://localhost:3000/leadData/${leadId}`;
    return this._http.delete(url);
  }  
  // Other methods to update and manage leads data
}

