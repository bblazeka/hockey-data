package main
import "fmt"
import "net/http"
func main() {
	// template for testing the solution in golang
    resp, err := http.Get("http://localhost:50540")
	if err != nil {
		fmt.Println("Error while fetching")
	}
	fmt.Println(resp)
	resp2, err2 := http.Get("http://localhost:5000")
	if err2 != nil {
		fmt.Println("Error while fetching")
	}
	fmt.Println(resp2)
	defer resp.Body.Close()
}