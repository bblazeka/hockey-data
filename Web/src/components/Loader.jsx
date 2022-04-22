import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader as SemanticLoader } from "semantic-ui-react";

import { DEFAULT_LOADING_TEXT } from "util/common";

export default function Loader({ text }) {
  return (
    <Dimmer active inverted>
      <SemanticLoader>{text ? text : DEFAULT_LOADING_TEXT}</SemanticLoader>
    </Dimmer>
  );
}

Loader.propTypes = {
  text: PropTypes.string,
};
