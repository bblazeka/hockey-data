import React, { Component } from 'react';
import { connect } from 'react-redux';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import * as actions from '../../services/league';
import './Schedule.css';
import Loader from '../../components/Loader/Loader';
import { covertDateTimeToString, getDatesArray } from '../../util/converter';

import { Table, Button } from 'semantic-ui-react';
import { getLogo } from '../../util/assets';

class Schedule extends Component {
  constructor(props) {
    super(props)
    var today = new Date("2020-01-01");
    var finish = new Date(today);
    finish.setDate(finish.getDate() + 7);
    this.state = {
      start: today,
      end: finish,
    }
    this.getScheduleForTimePeriod()
  }

  handleStartChange(date) {
    this.setState({
      start: date
    });
  };

  handleEndChange(date) {
    this.setState({
      end: date
    });
  };

  getScheduleForTimePeriod() {
    //var start = covertDateTimeToString(this.state.start);
    //var end = covertDateTimeToString(this.state.end);
    var start = "2020-01-01";
    var end = "2020-01-07";
    this.props.getSchedule(start, end)
  }

  render() {
    const { start, end } = this.state;
    const { schedule } = this.props;
    var dates = getDatesArray(start, end);
    if (!schedule) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div>
        <DatePicker
          selected={start}
          onChange={date => this.handleStartChange(date)}
        />
        <DatePicker
          selected={end}
          onChange={date => this.handleEndChange(date)}
        />
        <Button onClick={() => this.getScheduleForTimePeriod()}>Refresh</Button>
        <Table><Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Team
                </Table.HeaderCell>
            {dates.map((date) => {
              return (<Table.HeaderCell key={`date${date}`}>
                {covertDateTimeToString(date)}
              </Table.HeaderCell>)
            })}
            <Table.HeaderCell>Games</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
          <Table.Body>
            {schedule.map((element) => {
              return (
                <Table.Row key={`games ${element.id}`}>
                  <Table.Cell key={`logo ${element.id}`}>
                    <img className="logo" src={getLogo(element.id)} alt={`img${element.id}`}></img>
                  </Table.Cell>
                  {dates.map((date) => {
                    var game = (element.games.filter(game => game.gameDate && game.gameDate.split("T")[0] === covertDateTimeToString(date)))[0]
                    try {
                      const logo = getLogo(game.opponent.team.id)
                      return (
                        <Table.Cell
                          key={`opp ${element.id}${game.gameDate}`}
                          className={element.id === game.home.team.id ? 'home-game' : 'away-game'}
                        >
                          <img className="logo" src={logo} alt={`img${game.gameDate}${element.id}`}></img>
                        </Table.Cell>
                      )
                    } catch (err) {
                      return (
                        <Table.Cell key={`empty ${element.id}${date.toString()}`} ></Table.Cell>
                      )
                    }

                  })}
                  <td>
                    {element.games.length}
                  </td>
                </Table.Row>)
            })}
          </Table.Body></Table></div>);
  }
}

const mapStateToProps = state => ({
  schedule: state.league.schedule,
})

const mapDispatchToProps = dispatch => ({
  getSchedule: (start, end) => dispatch(actions.getSchedule(start, end))
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);