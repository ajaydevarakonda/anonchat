import React from 'react';
import './Chat.css';
import ChatMessage from './ChatMessage';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.message = "";
        this.state.messages = [];
        this.state.socket = props.socket;

        // This binding is necessary to make `this` work in the callback
        this.sendMessage = this.sendMessage.bind(this);
        this.messageInputChange = this.messageInputChange.bind(this);
        this.pushMessageIntoList = this.pushMessageIntoList.bind(this);
    }

    componentDidMount() {
        this.state.socket.on('message', this.pushMessageIntoList);
    }

    sendMessage(e) {
        e.preventDefault();
        const message = document.querySelector("#message").value;
        if (!message || !message.length) return false;
        // send the message to the server.
        this.state.socket.emit("user-message", message);
    }

    messageInputChange(e) {
        this.setState({ message: e.target.value });
    }

    pushMessageIntoList(msg) {
        var msg_parsed = JSON.parse(msg);
        if (!msg_parsed.timestamp) msg_parsed.timestamp = new Date().toString();
        const messages = this.state.messages || [];
        this.setState({ messages: messages.concat(msg_parsed) })
    }

    render() {
        return (
          <div className="App">
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
              {/* ======================================================================
                    MAIN CONTENT */}
              <main className="mdl-layout__content">
                <div className="mdl-grid mdl-grid--no-spacing">
                  {/* ==================================================================
                                SIDENAV */}
                  <div className="mdl-cell mdl-cell--2-col sidenav vh100 text-center">
                    <h5>ANONCHAT</h5>
                  </div>

                  {/* ==================================================================
                                CHATBOX */}
                  <div className="mdl-cell mdl-cell--8-col chatbox">
                    <div id="chatbox-literal">
                        {/* Chatbox hash here */}   
                        <h6>#aaaaaaaaaaaaaaaaaaaa</h6>
                    </div>
                    <div id="chat">

                        {/* ==================================================================
                            CHAT MESSAGES */}
                        {
                            this.state.messages.map((message) => 
                            <ChatMessage sender={message.sender} message={message.message} timestamp={message.timestamp}></ChatMessage> )
                        }

                    </div>
                    {/* ==================================================================
                        SEND MESSAGE */}
                    <form id="message-form" onSubmit={this.sendMessage}>
                      <span id="username">hello-freak-bitches</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="mdl-textfield mdl-js-textfield message-textfield">
                        <input className="mdl-textfield__input" type="text" id="message" 
                            onChange={this.messageInputChange} value={this.state.message}
                            autoComplete="off" />
                        <label className="mdl-textfield__label" htmlFor="message">Message</label>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        id="send-button"
                        disabled={!this.state.message && !this.state.message.length}
                      >
                        <i
                          className="fa fa-paper-plane"
                          aria-hidden="true"
                        />
                      </button>
                    </form>
                  </div>

                  {/* ==================================================================
                            USERS */}
                  <div className="mdl-cell mdl-cell--2-col userlist">
                    <div id="users-literal">
                      <h6>Users</h6>
                    </div>
                    <div id="users">
                        <div className="user">User1</div>
                        <div className="user">User1</div>
                        <div className="user">User1</div>
                        <div className="user">User1</div>
                        <div className="user">User1</div>
                    </div>
                  </div>
                </div>
                {/* /.grid */}
              </main>
              {/* /.layout */}
            </div>
            {/* /.App */}
          </div>
        );
    }
}

export default Chat;
