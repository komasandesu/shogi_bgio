import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('root');
// const root = createRoot(container!);
// root.render(<App />);
