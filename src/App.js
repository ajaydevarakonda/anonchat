import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Join } from "./routes/join";
import { Chat } from './routes/chat';

export const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={(routeProps) => (
        <Join {...routeProps}/>
      )} />
      <Route exact path="/chat" render={(routeProps) => (
        <Chat {...routeProps}/>
      )} />
    </Switch>
  </Router>
  );
