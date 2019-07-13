import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import openSocket from 'socket.io-client';

import './App.css';
import Join from './Join';
import Chat from './Chat';

/**
 * The root app contains the Router only.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.socket = openSocket('http://localhost:3300');
  }

  render() {
    return (<Router>
      <div>
        <Route exact path="/"
          render={(routeProps) => (<Join {...routeProps} socket={this.state.socket} />)}
        />
        <Route path="/chat" 
          render={(routeProps) => (<Chat  {...routeProps} socket={this.state.socket} />)}
        />
      </div>
    </Router>);
  }
}

export default App;
