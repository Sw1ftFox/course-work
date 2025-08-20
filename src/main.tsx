import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
