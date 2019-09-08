import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Standings.css';
import Loader from '../Loader/Loader';

class Standings extends Component {
    constructor(props) {
        super(props)
        this.props.getStandings()
    }

    render() {
        const { standings } = this.props;
        console.log(standings)
        if (!standings) {
            return (<div><Loader></Loader></div>)
        }
        return (<div>{standings.toString()}</div>);
    }
}

const mapStateToProps = state => ({
    standings: state.app.standings,
})

const mapDispatchToProps = dispatch => ({
    getStandings: () => dispatch(appActions.getStandings())
})

export default connect(mapStateToProps, mapDispatchToProps)(Standings);