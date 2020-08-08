import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html'
})
export class LeaguesComponent {
  public leagues: League[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<League[]>(baseUrl + 'api/leagues/').subscribe(result => {
      this.leagues = result;
    }, error => console.error(error));
  }
}

interface League {
  leagueId: number;
  leagueShort: string;
  leagueName: string;
}
