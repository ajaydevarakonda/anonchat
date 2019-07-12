import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class="App">
      {/* ================================================================================
          NAVBAR */}
      <div class="navbar">
        <div class="mdl-layout mdl-js-layout">
          <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
              {/* Add an image here */}
              <span class="mdl-layout-title">AnonChat</span>
              <div class="mdl-layout-spacer"></div>
            </div>
          </header>
        </div>
      </div>


      {/* ================================================================================
          MAIN CONTENT */}
      <main>
        <form>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="hash" />
            <label class="mdl-textfield__label" for="hash">Chat room hash</label>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Join
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
