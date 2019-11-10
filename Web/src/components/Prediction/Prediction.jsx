import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Prediction.css';

import Loader from '../Loader/Loader';
import { Image, List, Segment, Grid, Label, Header } from 'semantic-ui-react';

class Prediction extends Component {
    constructor(props) {
        super(props)
        this.props.getPrediction()
    }


    render() {
        const { prediction, teams } = this.props;
        if (!prediction) {
            return (<div><Loader></Loader></div>)
        }
        return (
            <div>
                <List>
                    {prediction && prediction.map((game)=> {
                        const homeLogo = teams.filter((team)=>{
                            return team.id === game.home["id"]
                        })[0].logo;
                        const awayLogo = teams.filter((team)=>{
                            return team.id === game.away["id"]
                        })[0].logo;
                        console.log(homeLogo,awayLogo)
                        return(
                            <List.Item>
                                <Segment textAlign='center'>
                                    <Grid columns={2} textAlign='center'>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Header as="h3">{game.home["name"]}</Header>
                                                <Image src={homeLogo} centered size='small'/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Header as="h3">{game.away["name"]}</Header>
                                                <Image src={awayLogo} centered size='small' />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <Label >
                                        Predicted outcome: {game.prediction}
                                    </Label>
                                </Segment>
                            </List.Item>
                            )
                    })}
                </List>
            </div>);
    }
}

const mapStateToProps = state => ({
    prediction: state.app.prediction,
    teams: state.app.teams,
})

const mapDispatchToProps = dispatch => ({
    getPrediction: () => dispatch(appActions.getPrediction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);