package main

import (
	_ "github.com/denisenkom/go-mssqldb"
)

type GameTeam struct {
    BasicTeam   BasicTeam   `json:"team"`
    Goals       int   `json:"goals"`
}

type GameTeams struct {
    Home       GameTeam   `json:"home"`
    Away       GameTeam   `json:"away"`
}

type GameResponse struct {
    GameTeams       GameTeams   `json:"teams"`
}

type BasicTeam struct {
	Id				int			`json:"id"`
	Name			string		`json:"name"`
}

type RosterResponse struct {
	Players			[]Player	`json:"roster"`
}

type Team struct {
	Id				int		`json:"id"`
	Name			string	`json:"name"`
	RosterResponse	RosterResponse	`json:"roster"`
}

type TeamResponse struct {
	Teams			[]Team 		`json:"teams"`
}

