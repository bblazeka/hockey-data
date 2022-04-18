import React from "react";
import PropTypes from "prop-types";
import { Button, Header, Segment } from "semantic-ui-react";

export default function ErrorFallback({ error, onReset, title }) {
  return (
    <Segment placeholder>
      <Header>{title ?? "Oops, there was an error"}</Header>
      <Segment.Inline>
        <Segment>{error.message}</Segment>
        <Button onClick={onReset}>Go to start screen</Button>
      </Segment.Inline>
    </Segment>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
  onReset: PropTypes.func,
  title: PropTypes.string
};
