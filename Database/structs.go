package main

import (
	_ "github.com/denisenkom/go-mssqldb"
)

type BasicTeam struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type GameTeam struct {
	TeamGoals int       `json:"score"`
	BasicTeam BasicTeam `json:"team"`
}

type GameTeams struct {
	AwayTeam GameTeam `json:"away"`
	HomeTeam GameTeam `json:"home"`
}

type Game struct {
	Id        int       `json:"gamePk"`
	GameTeams GameTeams `json:"teams"`
}

type Date struct {
	Date  string `json:"date"`
	Games []Game `json:"games"`
}

type GameResponse struct {
	Dates []Date `json:"dates"`
}

type RosterResponse struct {
	Players []Player `json:"roster"`
}

type Team struct {
	Id             int            `json:"id"`
	Name           string         `json:"name"`
	RosterResponse RosterResponse `json:"roster"`
}

type TeamResponse struct {
	Teams []Team `json:"teams"`
}

// PLAYERS

type Person struct {
	Id   int    `json:"id"`
	Name string `json:"fullName"`
}

type Player struct {
	Person Person `json:"person"`
}

type Position struct {
	Code string `json:"abbreviation"`
}

type FullPerson struct {
	Id                 int    `json:"id"`
	Name               string `json:"fullName"`
	BirthDate          string `json:"birthDate"`
	BirthCity          string `json:"birthCity"`
	BirthStateProvince string `json:"birthStateProvince"`
	BirthCountry       string `json:"birthCountry"`
	Nationality        string `json:"nationality"`
	FeetHeight         string `json:"height"`
	Height             float64
	Weight             float64   `json:"weight"`
	Active             bool      `json:"active"`
	Position           Position  `json:"primaryPosition"`
	Team               BasicTeam `json:"currentTeam"`
	Rostered           string    `json:"rosterStatus"`
	Rookie             bool      `json:"rookie"`
	ShootsCatches      string    `json:"shootsCatches"`
}

type PlayerResponse struct {
	Players []FullPerson `json:"people"`
}
