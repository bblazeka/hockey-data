package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"regexp"
	"strconv"
	"time"

	_ "github.com/denisenkom/go-mssqldb"
)

var db *sql.DB
var err error

func ExecuteQueryReader(query string) (*sql.Rows, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	return rows, err
}

func ExecuteNonQuery(query string, args ...interface{}) (int64, error) {
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

	result, err := db.ExecContext(
		ctx,
		query,
		args...)
	if err != nil {
		log.Fatal(err.Error())
		return -1, err
	}

	return result.RowsAffected()
}

func main() {
	jsonFile, err := os.Open("db.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened config file db.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()
	dat, err := ioutil.ReadAll(jsonFile)
	var dbData DbData
	json.Unmarshal(dat, &dbData)
	// Build connection string
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;",
		dbData.Server, dbData.User, dbData.Password, dbData.Port, dbData.Database)
	// Create connection pool
	db, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}
	ctx := context.Background()
	err = db.PingContext(ctx)
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Printf("Connected!\n")

	// option that also inserts new players
	//PopulateTeams()

	// update player data and player teams
	UpdatePlayers()
}

func dateParse(date string) (time.Time, error) {
	// layout format explanation:
	// https://yourbasic.org/golang/format-parse-string-time-date-example/
	layout := "2006-01-02"
	t, err := time.Parse(layout, date)
	return t, err
}

func feetToCm(feet string) (float64, error) {
	const cm1 = 30.48
	const cm2 = 2.54

	var parsedTokens []float64

	reg := regexp.MustCompile("[0-9]+")
	filtered := reg.FindAllString(feet, -1)

	for _, v := range filtered {
		k, _ := strconv.ParseFloat(v, 64)
		parsedTokens = append(parsedTokens, k)
	}

	return parsedTokens[0]*cm1 + parsedTokens[1]*cm2, nil
}
