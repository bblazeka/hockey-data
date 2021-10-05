import React from "react";
import PropTypes from "prop-types";
import { Button, Header, Segment } from "semantic-ui-react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Segment placeholder>
      <Header>Oops, there was an error</Header>
      <Segment.Inline>
        <Segment>{error.message}</Segment>
        <Button onClick={resetErrorBoundary}>Go to start screen</Button>
      </Segment.Inline>
    </Segment>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};
