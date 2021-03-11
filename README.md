# Hockey data

Hobby project that collects data related to the world of hockey and display it on a web site. Data is mostly fetched from APIs, only a minority is stored in a database. Important idea behind the application was to avoid the editorial overhead of fetching and maintaining the data. Due to the abundance of data related to this subject that is available, it was a very interesting opportunity for me to try it out. Web site isn't intended to be published, but rather it is meant to be a place to try out different modern web technologies.

## Architecture & tools

This project was an ideal opportunity to try out MERN Stack (MongoDB, Express JS, React JS and Node JS). In the meantime, GraphQL was also added to the mix because of interesting possibilites it has to offer.
Environment currently consists of three key segments: 
- MongoDB database
- Server (Express.js - GraphQL)
- Web interface (Javascript React)

On front-end side, [Semantic UI React](https://www.npmjs.com/package/semantic-ui-react) was used extensively since it does supply web components developers would have to build themselves. On such small project with only one developer, it did help a lot to make the process shorter and warrant at least some basic level of design consistency. Library [Mapbox GL JS](https://www.npmjs.com/package/mapbox-gl) was used for making interactive maps.

## Data
Some data is stored in a database to reduce the number of API requests, but majority of data is fetched from third-party APIs. Thus, only a basic MongoDB database is required to configure the application.
Most of the data is related to the most popular hockey league in the World (National Hockey League) due to the fact that most data / content available online is related to it. The fact that public National Hockey League API was so [thoroughly documented](https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md), enables enthusiasts all around the World to make their project and grow the game of hockey.

Data displayed on the web site is mostly fetched from different APIs. Data used on this page consists of news, tweets, stats (for teams or players), wikipedia articles and map components. The scope of data fetched and used in this project may change through time, some additional social networks may be added, news and stat sources, but should mostly revolve over same core types of information:

- Game stats
- news
- social media content
- wikipedia definitions and articles

Other notable data/image sources were mentioned in footer of the page.