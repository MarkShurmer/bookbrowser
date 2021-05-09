import React from 'react';
import './App.scss';
import BookContainer from './BookContainer/BookContainer';

function App() {
  return (
    <div className="AppContainer">
      <header>
        <h1 className="header">Book Browser</h1>
      </header>
      <BookContainer />
     
    </div>
  );
}

export default App;
