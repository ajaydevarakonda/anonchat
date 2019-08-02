import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Join from './Join';
import Chat from './Chat';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Router>
      <Switch>
        <Route exact path="/" render={(routeProps) => (
          <Join {...routeProps}/>
        )} />
        <Route exact path="/chat" render={(routeProps) => (
          <Chat {...routeProps}/>
        )} />
      </Switch>
      
    </Router>)
  }
}

export default App;