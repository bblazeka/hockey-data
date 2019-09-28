import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Settings.css';

class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.props.populate}>Populate Database</button>
                <button onClick={this.props.update}>Update Database</button>
            </div>);
    }
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    populate: () => dispatch(appActions.populateDatabase()),
    update: () => dispatch(appActions.updateDatabase())
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);