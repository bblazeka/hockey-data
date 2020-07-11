package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/denisenkom/go-mssqldb"
)

// GAMES -------------------------------------------------------------------------------------------

func InsertGame(game Game) (int64, error) {
	ctx := context.Background()
	var err error

	if db == nil {
		return -1, nil
	}

	// Check if database is alive.
	err = db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.Games (GameId, HomeId, AwayId, HomeGoals, AwayGoals) VALUES (@Id, @HomeId, @AwayId, @HomeGoals, @AwayGoals);"

	_, err = db.ExecContext(
		ctx,
		tsql,
		sql.Named("Id", game.Id),
		sql.Named("HomeId", game.GameTeams.HomeTeam.BasicTeam.Id),
		sql.Named("AwayId", game.GameTeams.AwayTeam.BasicTeam.Id),
		sql.Named("HomeGoals", game.GameTeams.HomeTeam.TeamGoals),
		sql.Named("AwayGoals", game.GameTeams.AwayTeam.TeamGoals))

	if err != nil {
		fmt.Printf("Game %d already inserted.\n", game.Id)
	} else {
		fmt.Printf("Game between %s and %s is in the database.\n",
			game.GameTeams.HomeTeam.BasicTeam.Name,
			game.GameTeams.AwayTeam.BasicTeam.Name)
	}

	return 1, nil
}

func UpdateGame(game Game, date string) (int, error) {
	t, _ := dateParse(date)
	ExecuteNonQuery(`UPDATE dbo.Games 
    SET HomeId = @HomeId, 
    AwayId = @AwayId, 
    HomeGoals = @HomeGoals, 
    AwayGoals = @AwayGoals, 
    DatePlayed = @DatePlayed 
    WHERE GameId = @Id;`,
		sql.Named("Id", game.Id),
		sql.Named("HomeId", game.GameTeams.HomeTeam.BasicTeam.Id),
		sql.Named("AwayId", game.GameTeams.AwayTeam.BasicTeam.Id),
		sql.Named("HomeGoals", game.GameTeams.HomeTeam.TeamGoals),
		sql.Named("AwayGoals", game.GameTeams.AwayTeam.TeamGoals),
		sql.Named("DatePlayed", t))

	return 1, nil
}

func PopulateGames() (int, error) {
	query := "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&startDate=2019-10-01&endDate=2020-04-01"
	resp, err := http.Get(fmt.Sprintf(query))
	if err != nil {
		fmt.Printf("Error getting season games!\n")
		log.Fatal(err)
	}
	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}
	bytes := []byte(string(body))
	// Fill the record with the data from the JSON
	var record GameResponse

	// Use json.Decode for reading streams of JSON data
	json.Unmarshal(bytes, &record)

	for _, date := range record.Dates {
		for _, game := range date.Games {
			InsertGame(game)
		}
	}

	return 1, nil
}

func UpdateGames() (int, error) {
	query := "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&startDate=2019-10-01&endDate=2020-04-01"
	resp, err := http.Get(fmt.Sprintf(query))
	if err != nil {
		fmt.Printf("Error getting season games!\n")
		log.Fatal(err)
	}
	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}
	bytes := []byte(string(body))
	// Fill the record with the data from the JSON
	var record GameResponse

	// Use json.Decode for reading streams of JSON data
	json.Unmarshal(bytes, &record)

	for _, date := range record.Dates {
		for _, game := range date.Games {
			UpdateGame(game, date.Date)
		}
	}

	return 1, nil
}

// PLAYERS ----------------------------------------------------------------------------------------

func InsertPlayer(id int, name string) (int64, error) {
	ctx := context.Background()
	var err error

	if db == nil {
		return -1, nil
	}

	// Check if database is alive.
	err = db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.Players (PlayerId, FullName) VALUES (@PlayerId, @FullName);"

	_, err = db.ExecContext(
		ctx,
		tsql,
		sql.Named("PlayerId", id),
		sql.Named("FullName", name))

	if err != nil {
		fmt.Printf("SKIP: Player %s is already in the database.\n", name)
	} else {
		fmt.Printf("NEW: Player %s is added to the database.\n", name)
	}

	return 1, nil
}

func UpdatePlayers() (int, error) {
	rows, err := ExecuteQueryReader("SELECT PlayerId, FullName, TeamId FROM dbo.Players p;")
	if err != nil {
		return -1, err
	}

	// executed after return
	defer rows.Close()

	var count int

	// Iterate through the result set.
	for rows.Next() {
		var name string
		var id int
		var teamId int

		// Get values from row.
		err := rows.Scan(&id, &name, &teamId)
		if err != nil {
			if teamId != 0 {
				log.Fatal(err)
			}
		}

		player, err := GetPlayer(id)
		if err != nil {
			log.Fatal(err)
			return -1, err
		}

		UpdatePlayer(player)
		if teamId != player.Team.Id {
			fmt.Printf("Player %s team will be updated.\n", player.Name)
			UpdatePlayerTeams(player.Id, player.Team.Id)
		}

		count++
	}

	return count, nil
}

func GetPlayer(id int) (FullPerson, error) {
	resp, err := http.Get(fmt.Sprintf("https://statsapi.web.nhl.com/api/v1/people/%d", id))
	if err != nil {
		log.Fatal(err)
	}
	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}
	bytes := []byte(string(body))

	var record PlayerResponse

	json.Unmarshal(bytes, &record)

	player := record.Players[0]
	player.Height, _ = feetToCm(player.FeetHeight)
	player.Weight = 0.45359237 * player.Weight

	return player, nil
}

func ReadPlayers() (int, error) {

	rows, err := ExecuteQueryReader("SELECT Id, Name FROM dbo.Players p;")
	if err != nil {
		return -1, err
	}

	defer rows.Close()

	var count int

	// Iterate through the result set.
	for rows.Next() {
		var name string
		var id int

		// Get values from row.
		err := rows.Scan(&id, &name)
		if err != nil {
			return -1, err
		}

		fmt.Printf("ID: %d, Name: %s\n", id, name)
		count++
	}

	return count, nil
}

func UpdatePlayer(player FullPerson) (int64, error) {
	var birthPlace string
	if birthPlace = fmt.Sprintf("%s, %s", player.BirthCity, player.BirthCountry); player.BirthStateProvince != "" {
		birthPlace = fmt.Sprintf("%s, %s, %s", player.BirthCity, player.BirthStateProvince, player.BirthCountry)
	}
	fmt.Printf("Updating %s %s\n", player.Name, player.Position.Code)
	ExecuteNonQuery(`UPDATE dbo.Players 
                        SET FullName = @Name,
                            BirthPlace = @BirthPlace,
                            DateOfBirth = @BirthDate,
							Nationality = @Nationality,
							Position = @Position,
							Weight = @Weight,
							Height = @Height,
							Active = @Active,
							Rostered = @Rostered,
							Rookie = @Rookie,
							ShootsCatches = @ShootsCatches
                        WHERE PlayerId = @Id;`,
		sql.Named("Id", player.Id),
		sql.Named("Name", player.Name),
		sql.Named("BirthPlace", birthPlace),
		sql.Named("BirthDate", player.BirthDate),
		sql.Named("Position", player.Position.Code),
		sql.Named("Height", player.Height),
		sql.Named("Weight", player.Weight),
		sql.Named("Active", player.Active),
		sql.Named("Rostered", player.Rostered),
		sql.Named("Rookie", player.Rookie),
		sql.Named("ShootsCatches", player.ShootsCatches),
		sql.Named("Nationality", player.Nationality))

	return 1, nil
}

func UpdatePlayerTeams(id int, teamId int) (int64, error) {
	cnt, err := ExecuteNonQuery("UPDATE dbo.Players SET TeamId = @TeamId WHERE PlayerId = @Id;",
		sql.Named("Id", id),
		sql.Named("TeamId", teamId))
	if err != nil {
		fmt.Printf("Update failed")
	}
	fmt.Printf("Updated team %d for player %d\n", teamId, id)
	return cnt, nil
}

// TEAMS ----------------------------------------------------------------------------------------

func PopulateTeams() (int, error) {

	count := 0

	for id := 1; id < 55; id++ {
		resp, err := http.Get(fmt.Sprintf("https://statsapi.web.nhl.com/api/v1/teams/%d?expand=team.roster", id))
		if err != nil {
			fmt.Printf("Error getting a team from an api!\n")
			log.Fatal(err)
		}
		body, readErr := ioutil.ReadAll(resp.Body)
		if readErr != nil {
			log.Fatal(readErr)
			continue
		}
		bytes := []byte(string(body))
		// Fill the record with the data from the JSON
		var record TeamResponse

		// Use json.Decode for reading streams of JSON data
		json.Unmarshal(bytes, &record)

		//InsertTeam(record.Teams[0].Id, record.Teams[0].Name)
		for _, element := range record.Teams[0].RosterResponse.Players {
			p, err := GetPlayer(element.Person.Id)
			if err != nil {
				fmt.Printf("Error fetching a player")
			}
			//UpdatePlayer(p)
			InsertPlayer(p.Id, p.Name)
		}
	}
	return count, nil
}

func InsertTeam(id int, name string) (int64, error) {
	ctx := context.Background()
	var err error

	if db == nil {
		return -1, nil
	}

	// Check if database is alive.
	err = db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.Teams (TeamId, FullName) VALUES (@Id, @Name);"

	stmt, err := db.Prepare(tsql)
	if err != nil {
		return -1, err
	}
	defer stmt.Close()

	stmt.QueryRowContext(
		ctx,
		sql.Named("Id", id),
		sql.Named("Name", name))

	return 1, nil
}
