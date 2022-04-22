import React from "react";
import { Header, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import { DEFAULT_NOT_FOUND_TEXT } from "util/common";

export default function NotFound({text}) {
  return (
    <Header textAlign="center">
      <Icon name="search" />
      {text ?? DEFAULT_NOT_FOUND_TEXT}
    </Header>
  );
}

NotFound.propTypes = {
  text: PropTypes.string,
};
