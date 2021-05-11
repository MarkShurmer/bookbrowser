import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';
import BookContainer from './BookContainer/BookContainer';

function App() {
  return (
    <div className="AppContainer">
      <header>
        <h1 className="header">Book Browser</h1>
      </header>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={BookContainer} />
      </Switch>
    </BrowserRouter>
    
     
    </div>
  );
}

export default App;
