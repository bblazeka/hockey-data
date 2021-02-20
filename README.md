# Hockey data

Hobby project used to collect data related to the world of hockey and display it on a web site. Web site isn't intended to be released, but rather it is meant to be a playground: Designed to provide an opportunity to join modern web technologies with love for hockey.

## Architecture
Currently consists of three segments: 
- MongoDB database
- Server (Express.js - GraphQL)
- Web interface (Javascript React)

## Data
Some data is stored in a database to reduce the number of API requests, but majority of data is fetched from third-party APIs. Thus, only a basic MongoDB database is required to configure the application.
Most of the data is related to the most popular hockey league in the World (National Hockey League) due to the fact that most data / content available online is related to it. The fact that public National Hockey League API was so [thoroughly documented](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md), enables enthusiasts all around the World to make their project and grow the game of hockey.

Data displayed on the web site is mostly fetched from different APIs. Data used on this page consists of news, tweets, stats (for teams or players), wikipedia articles and map components. The scope of data fetched and used in this project may change through time, some additional social networks may be added, news and stat sources, but should mostly revolve over same core types of information:

- Game stats
- news
- social media content
- wikipedia definitions and articles