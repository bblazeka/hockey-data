import React, { Component } from 'react';
import { connect } from 'react-redux';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import * as appActions from '../../actions/appActions';
import './Schedule.css';
import Loader from '../Loader/Loader';
import { covertDateTimeToString, getDatesArray } from '../../util/converter';

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
                <button onClick={() => this.getScheduleForTimePeriod()}>Refresh</button>
                <table><tbody>
                    <tr>
                        <td>
                            Team
                </td>
                        {dates.map((date) => {
                            return (<td key={"date" + date}>
                                {covertDateTimeToString(date)}
                            </td>)
                        })}
                    </tr>
                    {schedule.map((element) => {
                        return (
                            <tr>
                                <td>
                                    <img className="logo" src={element.logo} alt={"img" + element.id}></img>
                                </td>
                                {dates.map((date) => {
                                    var game = (element.games.filter(game => game.startDate && game.startDate.split("T")[0] === covertDateTimeToString(date)))[0]
                                    try {
                                        const logo = element.id === game.home.id ? game.away.logo : game.home.logo
                                        return (
                                            <td>
                                                <img className="logo" src={logo} alt={"img" + game.startDate + element.id}></img>
                                            </td>
                                        )
                                    } catch (err) {
                                        return (
                                            <td></td>
                                        )
                                    }

                                })}
                            </tr>)
                    })}
                </tbody></table></div>);
    }
}

const mapStateToProps = state => ({
    schedule: state.app.schedule,
})

const mapDispatchToProps = dispatch => ({
    getSchedule: (start, end) => dispatch(appActions.getSchedule(start, end))
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);