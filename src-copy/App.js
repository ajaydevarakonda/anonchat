import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import openSocket from 'socket.io-client';

import Join from './Join';
import Chat from './Chat';
import ChatContext from './ChatContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    // context state
    this.state = {
        socket: openSocket("https://anonchat-backend.herokuapp.com/"),
        username: null,
        room: null,
        currentRoomUsers: null,
        numberOfUsersInCurrentRoom: null,
    };

    this.setContextState = this.setContextState.bind(this);
  }

  setContextState(obj) {
      this.setState(obj);
  }

  render() {
    const methodsToShare = {
        setContextState: this.setContextState,
    }

    return (
      <Router>
        <ChatContext.Provider value={this.state}>
          <Switch>
            <Route exact path="/" render={(routeProps) => (
                <Join {...routeProps} {...methodsToShare} />
            )} />
            <Route exact path="/chat" render={(routeProps) => (
                <Chat {...routeProps} {...methodsToShare} />
            )} />
          </Switch>
        </ChatContext.Provider>
      </Router>
    );
  }
}

export default App;