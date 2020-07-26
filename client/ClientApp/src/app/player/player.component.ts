import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  public player: Player;
  public isSkater: boolean;

  constructor(http: HttpClient, route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string) {
    var paramId = route.snapshot.paramMap.get('id');
    http.get<Player>(baseUrl + 'api/players/' + paramId).subscribe(result => {
      this.player = result;
      this.isSkater = this.player.position !== 'G';
    }, error => console.error(error));
  }
}

interface Player {
  fullName: string;
  position: string;
  playerSeasons: PlayerSeason[]
}

interface PlayerSeason {
  seasonId: number;
  team: Team;
  league: League;
  nr: number;
  gp: number;
  goals: number;
  assists: number;
  points: number;
  pim: number;
  savesPercent: number;
  goalsAgainstAvg: number;
}

interface Team {
  teamId: number;
  teamName: string;
  teamLogoBase64: string;
}

interface League {
  leagueId: number;
  leagueName: string;
}
