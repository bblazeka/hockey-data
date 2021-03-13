import React from 'react';
import { Header, Item } from 'semantic-ui-react';
import { IsNullOrUndefined } from 'common';

import './NewsFeed.scss';
import Loader from '../Loader/Loader';

function NewsFeed(props) {
  const { news } = props;
  if (IsNullOrUndefined(news))
  {
    return (<Loader></Loader>)
  }
  return (
    <div className="news-container">
      <Header as='h3'>News</Header>
      {news.length === 0 && <div>Nothing found.</div>}
      <Item.Group>
          {news.map((article, index) => {
            return (<Item key={index}>
                <Item.Image src={article.urlToImage} className="mid-logo" alt={article.urlToImage} />
                <Item.Content>
                  <Item.Header>{article.title}</Item.Header>
                  <Item.Meta>{article.author} ({article.source.name})</Item.Meta>
                  <Item.Description>{article.description}</Item.Description>
                  <Item.Extra>{article.publishedAt}</Item.Extra>
                </Item.Content>
            </Item>);
          })}
        </Item.Group>
    </div>);

}

export default NewsFeed;