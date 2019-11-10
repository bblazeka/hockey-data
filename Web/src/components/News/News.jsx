import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, List } from 'semantic-ui-react';

import * as appActions from '../../actions/appActions';
import './News.css';
import Loader from '../Loader/Loader';

class News extends Component {

    constructor(props) {
        super(props)

        this.props.getNews()
    }

    render() {
        const { news, teams } = this.props;
        if (!news) {
            return (<div><Loader></Loader></div>)
        }
        const { sources } = news;
        return (
            <div className="news-container">
                        <List>
                        {news.starts.map((start)=>{
                            var team = teams.filter((team)=>{
                                return team.id === start.source.team
                            })[0];
                            var source = sources.filter((source)=>{
                                return source.id === start.source.id
                            })[0];
                            return (<List.Item>
                                <Image avatar src={team.logo} />
                                <List.Content>
                                    <List.Header>
                                        {source.name} (@{source.id})
                                    </List.Header>
                                    <List.Description>
                                    {start.created_at} : {start.text}
                                    </List.Description>
                                </List.Content>
                            </List.Item>);
                        })}
                        </List>
            </div>);
    }
}

const mapStateToProps = state => ({
    news: state.app.news,
    teams: state.app.teams,
})

const mapDispatchToProps = dispatch => ({
    getNews: () => dispatch(appActions.getNews())
})

export default connect(mapStateToProps, mapDispatchToProps)(News);