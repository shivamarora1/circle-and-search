import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl: string =  "http://localhost:3000"
  constructor(private http: HttpClient) { }

  postData(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/result`, data);
  }
}