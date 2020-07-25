import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamPageComponent {
  public team: Team;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Team>(baseUrl + 'teams').subscribe(result => {
      console.log(result);
      this.team = result;
    }, error => console.error(error));
  }
}

interface Team {
  teamName: string;
  players: Player[];
}

interface Player {
  fullName: string;
  position: string;
}
