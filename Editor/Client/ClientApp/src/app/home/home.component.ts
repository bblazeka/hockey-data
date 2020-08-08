import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private http: HttpClient;
  private router: Router;
  private baseUrl: string;
  playerName: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, router: Router) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = router;
  }

  onSearchClicked() {
    return this.http.get<Player>(this.baseUrl + 'api/players/search/' + this.playerName)
      .subscribe(result => this.router.navigate(['/player/' + result.playerId], { queryParams: {  } }));
  }
}

interface Player {
  playerId: number;
  fullName: string;
  position: string;
  nation: string;
}
