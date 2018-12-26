import React from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import './App.css';
import Test from './Components/Test';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
            <Route path="/Test" component={Test} />
      </BrowserRouter>
    );
  }
}

export default App;
