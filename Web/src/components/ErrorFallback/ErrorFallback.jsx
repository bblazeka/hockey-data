import React from "react";
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
