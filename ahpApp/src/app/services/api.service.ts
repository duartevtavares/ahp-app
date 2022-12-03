import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/participants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postParticipant(data: string) {
    return this.http.post<any>(baseUrl, data);
  }

  getParticipants() {
    return this.http.get<any>(baseUrl);
  }

  getSpecificParticipant(data: number) {
    return this.http.get<any>(`${baseUrl}/${data}`);
  }
}
