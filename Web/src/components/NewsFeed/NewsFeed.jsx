import React from 'react';
import { Header, Item } from 'semantic-ui-react';
import dayjs from 'dayjs';

import './NewsFeed.scss';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import { IsNullOrUndefined } from '../../util/common';

function NewsFeed(props) {
  const { news } = props;
  if (IsNullOrUndefined(news))
  {
    return (<Loader text='Loading news feed...'></Loader>);
  }
  return (
    <div className="news-container">
      <Header as='h3'>News</Header>
      {news.length === 0 && <NotFound />}
      <Item.Group>
          {news.map((article, index) => {
            return (<Item key={index}>
                <Item.Image src={article.urlToImage} className="mid-logo" alt={article.urlToImage} />
                <Item.Content>
                  <Item.Header href={article.url} target="_blank">{article.title}</Item.Header>
                  <Item.Meta>{article.author} ({article.source.name})</Item.Meta>
                  <Item.Description>{article.content}</Item.Description>
                  <Item.Extra>{dayjs(article.publishedAt).toString()}</Item.Extra>
                </Item.Content>
            </Item>);
          })}
        </Item.Group>
    </div>);

}

export default React.memo(NewsFeed);