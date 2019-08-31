import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../actions/appActions';
import './Schedule.css';
import Loader from './Loader';
import { covertDateTimeToString, getDatesArray } from '../util/converter';

class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: new Date(2019, 9, 9),
            end: new Date(2019, 9, 20)
        }
        console.log(this.state.start)
        this.getScheduleForTimePeriod()
    }

    componentDidMount() {
    }

    getScheduleForTimePeriod() {
        var start = covertDateTimeToString(this.state.start);
        var end = covertDateTimeToString(this.state.end);
        this.props.getSchedule(start, end)
    }

    render() {
        const { schedule } = this.props;
        var dates = getDatesArray(this.state.start, this.state.end);
        if (!schedule) {
            return (<div><Loader></Loader></div>)
        }
        return (<table>
            <tr>
                <td>
                    Team
                </td>
                {dates.map((date) => {
                    return (<td>
                        {covertDateTimeToString(date)}
                    </td>)
                })}
            </tr>
            {schedule.map((element) => {
                return (
                    <tr>
                        <td>
                            <img className="logo" src={element.logo}></img>
                        </td>
                        {dates.map((date) => {
                            var game = (element.games.filter(game => game.startDate && game.startDate.split("T")[0] === covertDateTimeToString(date)))[0]
                            try {
                                const logo = element.id === game.home.id ? game.away.logo : game.home.logo
                                return (
                                    <td>
                                        <img className="logo" src={logo}></img>
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
        </table>);
    }
}

const mapStateToProps = state => ({
    schedule: state.app.schedule,
})

const mapDispatchToProps = dispatch => ({
    getSchedule: (start, end) => dispatch(appActions.getSchedule(start, end))
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);