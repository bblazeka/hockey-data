import React, { Component } from 'react';
import { connect } from 'react-redux';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import * as appActions from '../../actions/appActions';
import './Schedule.css';
import Loader from '../Loader/Loader';
import { covertDateTimeToString, getDatesArray } from '../../util/converter';

import { Table, Button } from 'semantic-ui-react';

class Schedule extends Component {
    constructor(props) {
        super(props)
        var today = new Date();
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
        var start = covertDateTimeToString(this.state.start);
        var end = covertDateTimeToString(this.state.end);
        this.props.getSchedule(start, end)
    }

    render() {
        const { start, end } = this.state;
        const { schedule } = this.props;
        var dates = getDatesArray(start, end);
        if (!schedule) {
            return (<div><Loader></Loader></div>)
        }
        console.log(schedule)
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
                            return (<Table.HeaderCell key={"date" + date}>
                                {covertDateTimeToString(date)}
                            </Table.HeaderCell>)
                        })}
                        <Table.HeaderCell>
                            Games
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {schedule.map((element) => {
                        return (
                            <Table.Row key={"games " + element.Id}>
                                <Table.Cell key={"logo " + element.Id}>
                                    <img className="logo" src={element.Logo} alt={"img" + element.Id}></img>
                                </Table.Cell>
                                {dates.map((date) => {
                                    var game = (element.Games.filter(game => game.StartDate && game.StartDate.split("T")[0] === covertDateTimeToString(date)))[0]
                                    try {
                                        const logo = element.Id === game.Home.Id ? game.Away.Logo : game.Home.Logo
                                        return (
                                            <Table.Cell
                                                key={"opp " + element.Id + game.StartDate}
                                                className={element.Id === game.Home.Id ? 'home-game' : 'away-game'}
                                            >
                                                <img className="logo" src={logo} alt={"img" + game.StartDate + element.Id}></img>
                                            </Table.Cell>
                                        )
                                    } catch (err) {
                                        return (
                                            <Table.Cell key={"empty " + element.Id + date.toString()} ></Table.Cell>
                                        )
                                    }

                                })}
                                <td>
                                    {element.Games.length}  / {element.ScheduleStatus.HomeGames} / {element.ScheduleStatus.HigherPlacedOpponent}
                                </td>
                            </Table.Row>)
                    })}
                </Table.Body></Table></div>);
    }
}

const mapStateToProps = state => ({
    schedule: state.app.schedule,
})

const mapDispatchToProps = dispatch => ({
    getSchedule: (start, end) => dispatch(appActions.getSchedule(start, end))
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);