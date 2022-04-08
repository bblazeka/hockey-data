import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader as SemanticLoader } from "semantic-ui-react";

export default function Loader({ text }) {
  return (
    <Dimmer active inverted>
      <SemanticLoader>{text ? text : "Loading..."}</SemanticLoader>
    </Dimmer>
  );
}

Loader.propTypes = {
  text: PropTypes.string,
};
