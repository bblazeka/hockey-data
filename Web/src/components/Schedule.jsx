import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../actions/appActions';
import './Schedule.css';

class Schedule extends Component {
    constructor(props){
        super(props)
        this.props.getSchedule("2019-10-03","2019-10-20")
    }

    componentDidMount() {
    }

    render() {
        const { schedule } = this.props;
        console.log(schedule)
        if (!schedule) {
            return(<div>Loading...</div>)
        }
        return(<div>{schedule.map((element)=>{
            return (
            <div clasName="team">
                {element.id}
                {element.games.map((game)=>{
                    return (
                        <div className="game">
                            {game.startDate.split("T")[0]}
                            <div>
                            {element.id === game.home ? game.away : "@" + game.home}
                            </div>
                        </div>
                    )
                })} 
            </div>)})}
            </div>);
    }
}

const mapStateToProps = state => ({
    schedule: state.app.schedule,
  })
  
  const mapDispatchToProps = dispatch => ({
    getSchedule: (start, end) => dispatch(appActions.getSchedule(start, end))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Schedule);