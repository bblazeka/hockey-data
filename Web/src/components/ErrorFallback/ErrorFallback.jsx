import React from 'react';

export default function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Oops, there was an error:</p>
      <p style={{ color: 'red' }}>{error.message}</p>
    </div>
  );
}