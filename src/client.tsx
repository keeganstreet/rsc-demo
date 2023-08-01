import * as React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from "./App";

React.startTransition(() => {
  ReactDOMClient.hydrateRoot(
    document,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
