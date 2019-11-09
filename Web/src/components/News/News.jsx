import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as appActions from '../../actions/appActions';
import './News.css';
import Loader from '../Loader/Loader';
import routes from '../../routes';

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
        return (
            <div>
                <div className="roster">
                    <div className="news-part">
                        News
                    </div>
                    <div className="news-part">
                        {news.starts.map((start)=>{
                            var team = teams.filter((team)=>{
                                return team.id === start.source.team
                            })[0];
                            return (<div>
                                <img className="small-logo" src={team.logo} alt={"newsimg" + team.id}></img>
                                {start.created_at} : {start.text}
                            </div>)
                        })}
                    </div>
                    <div className="news-part">
                        {news.sources.map((source)=>{
                            return (<div>
                                {source.name} @{source.id}
                            </div>)
                        })}
                    </div>
                </div>
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