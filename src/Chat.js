import React from 'react';
import './Chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // This binding is necessary to make `this` work in the callback
        this.joinChat = this.joinChat.bind(this);
    }

    joinChat(e) {
        e.preventDefault();
        const hashInput = document.querySelector("#hash");
        const hash = hashInput.value;

        // do something with the hash
        // when done redirect to chat

    }

    render() {
        return (
            <div className="App">
                {/* ================================================================================
          NAVBAR */}
                <div className="navbar">
                    <div className="mdl-layout mdl-js-layout">
                        <header className="mdl-layout__header">
                            <div className="mdl-layout__header-row">
                                {/* Add an image here */}
                                <span className="mdl-layout-title">AnonChat</span>
                                <div className="mdl-layout-spacer"></div>
                            </div>
                        </header>
                    </div>
                </div>


                {/* ================================================================================
          MAIN CONTENT */}
                <main>
                    <form onSubmit={this.joinChat}>
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="text" id="demo-input" />
                            <label class="mdl-textfield__label" for="demo-input">Message</label>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                          Chat
                        </button>
                    </form>
                </main>
            </div>
        );
    }
}

export default Chat;
