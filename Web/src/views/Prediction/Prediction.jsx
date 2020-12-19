import React, { Component } from 'react';
import { connect } from 'react-redux';

//import * as actions from '../../services/league';
import './Prediction.css';

import Loader from '../../components/Loader/Loader';
import { Image, List, Segment, Grid, Label, Header, Progress } from 'semantic-ui-react';

class Prediction extends Component {

    render() {
        const { prediction, teams } = this.props;
        if (!prediction) {
            return (<div><Loader></Loader></div>)
        }
        return (
            <div>
                <List>
                    {prediction && prediction.map((game)=> {
                        const { home_record, away_record } = game;
                        const wins = home_record.wins / (home_record.wins + away_record.wins) * 100;
                        const losses = home_record.losses / (home_record.losses + away_record.losses) * 100;
                        const ot = home_record.ot / (home_record.ot + away_record.ot) * 100;
                        const homeLogo = teams.filter((team)=>{
                            return team.id === game.home["id"]
                        })[0].logo;
                        const awayLogo = teams.filter((team)=>{
                            return team.id === game.away["id"]
                        })[0].logo;
                        return(
                            <List.Item>
                                <Segment textAlign='center'>
                                    <Grid columns={3} textAlign='center'>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Header as="h4">HOME</Header>
                                                <Header as="h3">{game.home["name"]}</Header>
                                                <Image src={homeLogo} centered size='small'/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Progress percent={wins} label="Wins" color='blue' />
                                                <Progress percent={losses} label="Losses" color='blue' />
                                                <Progress percent={ot} label="OT" color='blue' />
                                                <Label >
                                                    Predicted outcome: {game.prediction}
                                                </Label>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Header as="h4">AWAY</Header>
                                                <Header as="h3">{game.away["name"]}</Header>
                                                <Image src={awayLogo} centered size='small' />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);