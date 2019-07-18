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
                            CHAT MESSAGE */}
                        <div className="mdl-grid mdl-grid--no-spacing chat-message">
                            <header className="mdl-cell mdl-cell--1-col-desktop">                                
                                <div class="chat-pic">
                                    
                                </div>
                            </header>
                            <div className="mdl-card mdl-cell mdl-cell--9-col-desktop">
                                <div className="mdl-card__supporting-text">
                                    <div>
                                        <span className="username">Kim</span>
                                        &nbsp;&nbsp;
                                        <span className="timestamp">{(new Date(new Date()-10000)).toLocaleString()}</span>
                                    </div>
                                    <span className="user-message">Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua
                                    nisi cupidatat eu. Nostrud in laboris labore nisi amet
                                    do dolor eu fugiat consectetur elit cillum esse.</span>
                                    
                                </div>
                            </div>                            
                        </div>

                        {/* ==================================================================
                            CHAT MESSAGE */}
                        <div className="mdl-grid mdl-grid--no-spacing chat-message">
                            <header className="mdl-cell mdl-cell--1-col-desktop">                                
                                <div class="chat-pic">
                                    
                                </div>
                            </header>
                            <div className="mdl-card mdl-cell mdl-cell--9-col-desktop">
                                <div className="mdl-card__supporting-text">
                                    <div>
                                        <span className="username">Arpan</span>
                                        &nbsp;&nbsp;
                                        <span className="timestamp">{(new Date()).toLocaleString()}</span>
                                    </div>
                                    <span className="user-message">Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua
                                    nisi cupidatat eu. Nostrud in laboris labore nisi amet
                                    do dolor eu fugiat consectetur elit cillum esse.</span>
                                    
                                </div>
                            </div>                            
                        </div>

                    </div>
                    {/* ==================================================================
                        SEND MESSAGE */}
                    <form id="message-form" onSubmit={this.sendMessage}>
                      <span id="username">hello-freak-bitches</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="mdl-textfield mdl-js-textfield message-textfield">
                        <input className="mdl-textfield__input" type="text" id="message" autoComplete="off" />
                        <label className="mdl-textfield__label" htmlFor="message">Message</label>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        id="send-button"
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
