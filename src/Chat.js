import React from 'react';
import './Chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // This binding is necessary to make `this` work in the callback
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(e) {
        e.preventDefault();
        const message = document.querySelector("#message").value;

        // send the message to the user.
        
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


                {/* ======================================================================
                    MAIN CONTENT */}
                <main id="chat-container" className="dl-layout__content">
                    {/* ==================================================================
                        CHATBOX */}
                    <div class="mdl-grid">
                        <div class="mdl-cell mdl-cell--10-col graybox" id="chatbox">
                            
                        </div>
                        <div class="mdl-cell mdl-cell--2-col graybox" id="userlist">
                        </div>
                    </div>


                    {/* ==================================================================
                        USERS */}

                    {/* ==================================================================
                        SEND MESSAGE */}
                    <form onSubmit={this.sendMessage}>
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input" type="text" id="message" />
                            <label className="mdl-textfield__label" htmlFor="message">Message</label>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </form>
                </main>
            </div>
        );
    }
}

export default Chat;
