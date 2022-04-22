import React from "react";
import { Header, Item } from "semantic-ui-react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { Loader, NotFound } from "components";

function NewsFeed({ news }) {
  if (!news) {
    return <Loader />;
  }
  return (
    <div>
      <Header as="h3">News</Header>
      {news.length === 0 && <NotFound />}
      <Item.Group>
        {news.map((article, index) => {
          return (
            <Item key={index}>
              <Item.Image
                src={article.urlToImage}
                className="mid-logo"
                alt={article.urlToImage}
              />
              <Item.Content>
                <Item.Header href={article.url} target="_blank">
                  {article.title}
                </Item.Header>
                <Item.Meta>
                  {article.author} ({article?.source?.name})
                </Item.Meta>
                <Item.Description>{article.content}</Item.Description>
                <Item.Extra>{dayjs(article.publishedAt).toString()}</Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </div>
  );
}

NewsFeed.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object)
};

export default React.memo(NewsFeed);
