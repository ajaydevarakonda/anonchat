import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Join from './Join';
import Chat from './Chat';

/**
 * The root app contains the Router only.
 */
function App() {
  return (<Router>
    <div>
      <Route exact path="/" component={Join} />
      <Route path="/chat" component={Chat} />
    </div>
  </Router>);
}

export default App;
