import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from '../models/Team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiUrl:string = 'http://localhost:52700';
  constructor(private http:HttpClient) { }

  getTeam(team:Team):Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/api/team/${team.id}`);
  }

  getTeams():Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/api/teams`);
  }
}
