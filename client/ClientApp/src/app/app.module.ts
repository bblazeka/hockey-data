import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LeaguesComponent,
    TeamsComponent,
    TeamComponent,
    PlayerComponent,
    PlayersComponent,
    EditPlayerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'player', component: EditPlayerComponent },
      { path: 'player/:id', component: PlayerComponent },
      { path: 'players', component: PlayersComponent },
      { path: 'player/:id', component: PlayerComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'team/:id/:season', component: TeamComponent },
      { path: 'leagues', component: LeaguesComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
