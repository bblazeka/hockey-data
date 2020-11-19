import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../services/league';

import { Button, Dropdown, Header, Segment, Table } from 'semantic-ui-react';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "0",
      home: 1,
      away: 2,
      filterActive: true,
    }
    this.changeAway = this.changeAway.bind(this);
    this.changeHome = this.changeHome.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  changeHome(event,data) {
    this.setState({
      home: data.value
    })
  }

  changeAway(event,data) {
    this.setState({
      away: data.value
    })
  }

  fetch() {
    this.props.getGame(this.state.home, this.state.away)
  }

  TeamRender(team) {
    return (
      <Segment>
        <Header as='h2'>{team.Name}</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Name
                        </Table.HeaderCell>
              <Table.HeaderCell>
                Pos
                        </Table.HeaderCell>
              <Table.HeaderCell>
                G
                        </Table.HeaderCell>
              <Table.HeaderCell>
                A
                        </Table.HeaderCell>
              <Table.HeaderCell>
                SOG
                        </Table.HeaderCell>
              <Table.HeaderCell>
                HIT
                        </Table.HeaderCell>
              <Table.HeaderCell>
                BLK
                        </Table.HeaderCell>
              <Table.HeaderCell>
                TOI
                        </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {team.Players.filter((player) => { return player.Position !== 'G' }).map((player) => {
              return (<Table.Row>
                <Table.Cell>{player.Name}</Table.Cell>
                <Table.Cell>{player.Position}</Table.Cell>
                <Table.Cell>{player.Goals}</Table.Cell>
                <Table.Cell>{player.Assists}</Table.Cell>
                <Table.Cell>{player.Shots}</Table.Cell>
                <Table.Cell>{player.Hits}</Table.Cell>
                <Table.Cell>{player.Blocked}</Table.Cell>
                <Table.Cell>{player.TimeOnIce}</Table.Cell>
              </Table.Row>)
            })}
          </Table.Body>
        </Table>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Name
                        </Table.HeaderCell>
              <Table.HeaderCell>
                SV
                        </Table.HeaderCell>
              <Table.HeaderCell>
                SV%
                        </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {team.Players.filter((player) => { return player.Position === 'G' }).map((player) => {
              return (<Table.Row>
                <Table.Cell>{player.Name}</Table.Cell>
                <Table.Cell>{player.Saves}</Table.Cell>
                <Table.Cell>{player.SavePerc}</Table.Cell>
              </Table.Row>)
            })}
          </Table.Body>
        </Table>
      </Segment>

    )
  }

  render() {
    const { game, dropdownTeams } = this.props;
    if (!dropdownTeams) {
      return (<div></div>);
    }
    return (
      <div>
        <Segment>
          <Dropdown
            onChange={this.changeHome}
            options={dropdownTeams.map(el => { return { "key": el.Key, "text": el.Value, "value": el.Key, "logo": { "avatar": true, "logo": el.Logo } } })
            } />
          <Dropdown
            onChange={this.changeAway}
            options={dropdownTeams.map(el => { return { "key": el.Key, "text": el.Value, "value": el.Key, "logo": { "avatar": true, "logo": el.Logo } } })
            } />
          <Button onClick={this.fetch}>OK</Button>
        </Segment>
        {game && <Segment.Group horizontal>
          {this.TeamRender(game.Home)}
          {this.TeamRender(game.Away)}
        </Segment.Group>}

      </div>);
  }
}

const mapStateToProps = state => ({
  game: state.app.game,
  dropdownTeams: state.app.dropdownTeams

})

const mapDispatchToProps = dispatch => ({
  getGame: (home,away) => dispatch(actions.getGame(home,away))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);