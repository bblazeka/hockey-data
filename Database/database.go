//usr/bin/env go run "$0" "$@"; exit

package main
import (
	_ "github.com/denisenkom/go-mssqldb"
	"database/sql"
	"context"
	"log"
	"fmt"
    "io/ioutil"
)

var db *sql.DB
var server = "bayessportanalyis.database.windows.net"
var port = 1433
var user = "bruno"
var database = "bayessportanalysis"
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
	dat, err := ioutil.ReadFile(".pass")
   // Build connection string
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;",
		server, user, string(dat), port, database)
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

	//PopulateTeams()

	UpdatePlayers()

	/*count, err := ReadPlayers()

	if err != nil {
        log.Fatal("Error reading Players: ", err.Error())
    }
    fmt.Printf("Read %d row(s) successfully.\n", count)*/
}