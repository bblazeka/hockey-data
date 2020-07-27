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
    console.log("im in", this.player, this.http, this.baseUrl + 'api/players');

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    return this.http.put<Player>(this.baseUrl + 'api/players/0', this.player).subscribe(result => console.log(result))
    ;
  }

  /*onSaveClicked(): Observable<Player> {
    console.log("im in", this.player, this.http, this.baseUrl + 'api/players');

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    return this.http.put<Player>(this.baseUrl + 'api/play{affadad}ers/0', this.player, httpOptions).pipe(
      catchError((err) => this.handleError(err))
    );
  }*/

    private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

interface Player {
  playerId: number;
  fullName: string;
  position: string;
  nation: string;
}
