import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed } from 'semantic-ui-react';

import * as actions from '../../services/news';
import Loader from '../../components/Loader/Loader';

import './Home.css';
import { SocialFeed } from '../../components';

class Home extends Component {

    constructor(props) {
        super(props)

        this.props.getHome()
        this.props.getTweets("NHL")
    }

    render() {
        const { homeNews, tweets } = this.props;
        if (!homeNews) {
            return (<div><Loader></Loader></div>)
        }
        return (
            <div className="news-container">
                        <Feed>
                        {homeNews.map((article)=>{
                            return (<Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Feed.User>{article.headline}</Feed.User>
                                        <Feed.Date>ESPN</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra>
                                        {article.description}
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>);
                        })}
                        </Feed>
                        <SocialFeed tweets={tweets}></SocialFeed>
            </div>);
    }
}

const mapStateToProps = state => ({
    homeNews: state.news.homeNews,
    teams: state.team.teams,
    tweets: state.news.tweets,
})

const mapDispatchToProps = dispatch => ({
    getHome: () => dispatch(actions.getHome()),
    getTweets: (query) => dispatch(actions.getTweets(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);