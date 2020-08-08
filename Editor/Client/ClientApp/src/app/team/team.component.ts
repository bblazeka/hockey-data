import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent {
  public team: Team;

  constructor(http: HttpClient, route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string) {
    var paramId = route.snapshot.paramMap.get('id');
    var paramSeason = route.snapshot.paramMap.get('season');
    http.get<Team>(baseUrl + 'api/teams/' + paramId + '/' + paramSeason).subscribe(result => {
      this.team = result;
    }, error => console.error(error));
  }
}

interface Team {
  teamName: string;
  teamLogoBase64: string;
  players: Player[];
}

interface Player {
  nr: number;
  fullName: string;
  position: string;
  birthPlace: string;
  birthdate: string;
  nation: string;
  flagBase64: string;
}
