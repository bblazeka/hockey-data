import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html'
})
export class TeamsComponent {
  public teams: Team[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Team[]>(baseUrl + 'api/teams/').subscribe(result => {
      this.teams = result;
    }, error => console.error(error));
  }
}

interface Team {
  teamId: number;
  teamLogoBase64: string;
  teamName: string;
  country: string;
}
