import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Search, Tab } from "semantic-ui-react";

import * as actions from "../../services/player";
import "./Player.scss";

import { Loader, NewsFeed, SocialFeed } from "components";
import PlayerStatsGrid from "./PlayerStatsGrid/PlayerStatsGrid";
import { IsNullOrUndefined } from "util/common";
import { getTweets, getNews } from "services/news";
import PlayerHeader from "./PlayerHeader";

const initialState = {
  isLoading: false,
  results: [],
  value: "",
  playerQuery: "",
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    const { player, tweets, loadingTweets } = props;
    if (state.id !== id) {
      props.getPlayer(id);
      return {
        id,
      };
    }
    if (
      (player !== null && state.playerQuery !== player.fullName) ||
      (!loadingTweets && IsNullOrUndefined(tweets))
    ) {
      props.getTweets(player.fullName);
      props.getNews(player.fullName);
      return {
        playerQuery: player.fullName,
      };
    }
    return null;
  }

  handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, value });

    if (this.state.value.length < 1 && value.length < 1) {
      return this.setState(initialState);
    }

    if (value.length > 2) {
      this.props.searchBasicPlayer(value);
    } else {
      this.setState({ isLoading: false });
    }
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: "", isLoading: false });
    this.props.getPlayer(result.id);
  }

  render() {
    const { isLoading, value } = this.state;
    const { player, suggestions, tweets, news } = this.props;
    if (!player) {
      return (
        <div>
          <Loader></Loader>
        </div>
      );
    }
    const panes = [
      {
        menuItem: "NHL stats",
        render: () => (
          <Tab.Pane>
            <PlayerStatsGrid
              data={player.nhlStats}
              skater={player.primaryPosition.code !== "G"}
              detailed={true}
            ></PlayerStatsGrid>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Career stats",
        render: () => (
          <Tab.Pane>
            <PlayerStatsGrid
              data={player.careerStats}
              skater={player.primaryPosition.code !== "G"}
              detailed={false}
            ></PlayerStatsGrid>
          </Tab.Pane>
        ),
      },
    ];
    return (
      <>
        <Search
          className="search-box"
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={suggestions}
          value={value}
        />
        <PlayerHeader player={player} />
        <Tab panes={panes} />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <NewsFeed news={news}></NewsFeed>
            </Grid.Column>
            <Grid.Column>
              <SocialFeed tweets={tweets}></SocialFeed>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player.player,
  suggestions: state.player.suggestions,
  tweets: state.news.tweets,
  news: state.news.news,
  loadingTweets: state.news.loadingTweets,
});

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (id) => dispatch(actions.getPlayer(id)),
  searchBasicPlayer: (name) => dispatch(actions.searchBasicPlayer(name)),
  getNews: (query) => dispatch(getNews(query)),
  getTweets: (query) => dispatch(getTweets(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
