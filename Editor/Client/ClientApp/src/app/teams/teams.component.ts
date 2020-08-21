import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html'
})
export class TeamsComponent {
  private http: HttpClient;
  public teams: Team[];
  private router: Router;
  private baseUrl: string;
  teamName: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, router: Router) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = router;
  }

  onSearchClicked() {
    return this.http.get<Team[]>(this.baseUrl + 'api/teams/search/' + this.teamName)
      .subscribe(result => this.teams = result);
  }
}

interface Team {
  teamId: number;
  teamLogoBase64: string;
  teamName: string;
  country: string;
}
