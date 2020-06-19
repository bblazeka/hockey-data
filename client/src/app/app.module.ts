import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamComponent } from './components/team/team.component';
import { StandingsComponent } from './components/standings/standings.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PlayerComponent } from './components/player/player.component';
import { LineupComponent } from './components/lineup/lineup.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    StandingsComponent,
    ScheduleComponent,
    PlayerComponent,
    LineupComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
