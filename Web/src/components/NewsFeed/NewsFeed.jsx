import React from 'react';
import { Feed, Header, Image } from 'semantic-ui-react';

import './NewsFeed.css';
import Loader from '../Loader/Loader';
import { isNullOrUndefined } from  '../../util/common';

function NewsFeed(props) {
  const { news } = props;
  if (isNullOrUndefined(news))
  {
    return (<Loader></Loader>)
  }
  return (
    <div className="news-container">
      <Header as='h3'>News</Header>
      <Feed>
          {news.map((article, index) => {
            return (<Feed.Event key={index}>
              <Feed.Content>
                <Feed.Label>
                  <Image src={article.urlToImage} className="mid-logo" alt={article.urlToImage} />
                </Feed.Label>
                <Feed.Summary>
                  <Feed.User>{article.title}</Feed.User>
                  <Feed.Date>{article.author} ({article.source.name})</Feed.Date>
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

export default NewsFeed;