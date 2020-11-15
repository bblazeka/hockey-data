import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Feed, Label } from 'semantic-ui-react';

import * as appActions from '../../actions/appActions';
import Loader from '../Loader/Loader';

import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props)

        this.props.getHome()
    }

    render() {
        const { homeNews, teams } = this.props;
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
            </div>);
    }
}

const mapStateToProps = state => ({
    homeNews: state.app.homeNews,
    teams: state.app.teams,
})

const mapDispatchToProps = dispatch => ({
    getHome: () => dispatch(appActions.getHome())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);