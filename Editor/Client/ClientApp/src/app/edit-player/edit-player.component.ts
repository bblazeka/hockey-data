import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html'
})
export class EditPlayerComponent {
  public player: Player;
  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.player = {
      playerId: null,
      fullName: null,
      position: null,
      nation: null
    };
  }

  onSaveClicked() {
    return this.http.put<Player>(this.baseUrl + 'api/players/' + this.player.playerId, this.player)
      .subscribe(result => console.log(result));
  }
}

interface Player {
  playerId: number;
  fullName: string;
  position: string;
  nation: string;
}
