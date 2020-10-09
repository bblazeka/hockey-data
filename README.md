# NHL Stats analysis

Applying various technologies in various aspects of NHL game and stats analysis. Client enables the user to have an overview of NHL stats, schedule and team data.

## Architecture
Currently consists of four segments: 
- Database project (Golang code for database maintenance, updates, etc.)
- Server project (C# .NET Core)
- Web (Javascript React Redux)
- SQL Database on Azure - used to reduce number of API calls (having metadata, relations not available in API, etc.)

## Links
Fetching data from publicly available NHL API with help of documentation: https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md

ESPN API documentation:
https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b#hockey