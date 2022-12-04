import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const participantsUrl = 'http://localhost:8080/participants';
const usersUrl = 'http://localhost:8080/users';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //Participants

  postParticipant(data: string) {
    return this.http.post<any>(participantsUrl, data);
  }

  getParticipants() {
    return this.http.get<any>(participantsUrl);
  }

  getSpecificParticipant(data: number) {
    return this.http.get<any>(`${participantsUrl}/${data}`);
  }

  //Users

  getUsers() {
    return this.http.get<any>(usersUrl);
  }
}
