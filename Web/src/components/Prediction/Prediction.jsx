import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Prediction.css';

import Loader from '../Loader/Loader';

class Prediction extends Component {
    constructor(props) {
        super(props)
        this.props.getPrediction()
    }


    render() {
        const { prediction } = this.props;
        if (!prediction) {
            return (<div><Loader></Loader></div>)
        }
        return (
            <div>
                {prediction && prediction.map((game)=> {
                    return(<div>{game.home["name"]}{game.away["name"]}{game.prediction}</div>)
                })}
            </div>);
    }
}

const mapStateToProps = state => ({
    prediction: state.app.prediction,
})

const mapDispatchToProps = dispatch => ({
    getPrediction: () => dispatch(appActions.getPrediction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);