import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postParticipant(data: any) {
    return this.http.post<any>('http://localhost:8080/', data);
  }

  getParticipants() {
    return this.http.get<any>('http://localhost:8080/participants');
  }
}
