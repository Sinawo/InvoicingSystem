import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Create a function to post data to the server and store it in db.json
  postData(data: any): Observable<any> {
    const url = `${this.apiUrl}/clients`; // Adjust the endpoint as needed
    return this.http.post(url, data);
  }
}
