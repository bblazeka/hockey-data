import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Label, Table } from 'semantic-ui-react';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './Schedule.scss';
import * as actions from '../../services/league';
import { Loader } from '../../components';
import routes from '../../routes';
import { getDatesArray } from '../../util/converter';
import { DateToServerFormat } from '../../util/common';
import { getLogo } from '../../util/assets';

class Schedule extends Component {

  constructor(props) {
    super(props);
    var today = new Date();
    var finish = new Date(today);
    finish.setDate(finish.getDate() + 7);
    this.state = {
      start: today,
      end: finish,
    };
  }

  componentDidMount() {
    this.getScheduleForTimePeriod();
  }

  handleStartChange(date) {
    this.setState({
      start: date
    });
  }

  handleEndChange(date) {
    this.setState({
      end: date
    });
  }

  getScheduleForTimePeriod() {
    var start = DateToServerFormat(this.state.start);
    var end = DateToServerFormat(this.state.end);
    this.props.getSchedule(start, end);
  }

  render() {
    const { start, end } = this.state;
    const { schedule } = this.props;
    var dates = getDatesArray(start, end);
    if (!schedule) {
      return (<Loader></Loader>);
    }
    return (
      <div className="schedule-page">
        <div className="filter">
          <div className="dates">
            <DatePicker
              selected={start}
              onChange={date => this.handleStartChange(date)}
              dateFormat="dd.MM.yyyy"
            />
            <DatePicker
              selected={end}
              onChange={date => this.handleEndChange(date)}
              dateFormat="dd.MM.yyyy"
            />
            <Label
              className="refresh-button"
              onClick={() => this.getScheduleForTimePeriod()}
            >
              <Icon name='refresh' /> Refresh
        </Label>
          </div>
          <div className='tag-container'>
            <Label as='a' className='home-game-tag' tag>
              Home game
          </Label>
            <Label as='a' className='away-game-tag' tag>
              Away game
          </Label>
          </div>
        </div>
        <Table><Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Team
                </Table.HeaderCell>
            {dates.map((date) => {
              return (<Table.HeaderCell key={`date${date}`}>
                {dayjs(DateToServerFormat(date)).format('DD.MM.')}
              </Table.HeaderCell>);
            })}
            <Table.HeaderCell>Games</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
          <Table.Body>
            {schedule.map((element) => {
              return (
                <Table.Row key={`games ${element.id}`}>
                  <Table.Cell key={`logo ${element.id}`}>
                    <Link to={`${routes.teams}/${element.id}`}><img className="logo" src={getLogo(element.id)} alt={`img${element.id}`}></img></Link>
                  </Table.Cell>
                  {dates.map((date) => {
                    var game = (element.games.filter(game => game.date && game.date === DateToServerFormat(date)))[0];
                    try {
                      const logo = getLogo(game.opponent.team.id);
                      return (
                        <Table.Cell
                          key={`opp ${element.id}${game.date}`}
                          className={element.id === game.home.team.id ? 'home-game' : 'away-game'}
                        >
                          <img className="logo" src={logo} alt={`img${game.gameDate}${element.id}`}></img>
                          <div className="matchup-info">
                            {game.opponent.leagueRecord.wins}-{game.opponent.leagueRecord.losses}-{game.opponent.leagueRecord.ot}
                            <br />
                            {game.opponent.rating}
                          </div>
                        </Table.Cell>
                      );
                    } catch (err) {
                      return (
                        <Table.Cell key={`empty ${element.id}${date.toString()}`} ></Table.Cell>
                      );
                    }

                  })}
                  <td className="emphasized-letter">
                    {element.games.length}
                  </td>
                  <td>
                    <div className="matchup-info">
                      {element.scheduleScore}
                      <br />
                      {element.avgScheduleScore}
                    </div>
                  </td>
                </Table.Row>);
            })}
          </Table.Body>
        </Table>
      </div>);
  }
}

const mapStateToProps = state => ({
  schedule: state.league.schedule,
});

const mapDispatchToProps = dispatch => ({
  getSchedule: (start, end) => dispatch(actions.getSchedule(start, end))
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);