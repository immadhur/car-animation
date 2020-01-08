import React from 'react';
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import routes from './app/config/routes';

function App() {
  return (
    <BrowserRouter>{routes}
</BrowserRouter>
  );
}

export default App;
