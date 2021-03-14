import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import './NotFound.scss';

function NotFound(props) {
  return (
    <Header textAlign='center'>
      <Icon name='search' />
      {props.text ? props.text : "Not found."}
    </Header>);

}

export default NotFound;