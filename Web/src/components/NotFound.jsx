import React from "react";
import { Header, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

export default function NotFound({text}) {
  return (
    <Header textAlign="center">
      <Icon name="search" />
      {text ?? "Not found."}
    </Header>
  );
}

NotFound.propTypes = {
  text: PropTypes.string,
};
