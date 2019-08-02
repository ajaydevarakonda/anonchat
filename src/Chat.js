import React, { Component } from 'react';

class Chat extends Component {
    render() {
        return (<div>
            <div class="chat-page-container">
                <div class="left-div">
                    <div>
                        <h3 class="channel-literal">CHANNEL</h3>
                        <br />
                        <span class="channel-name selected">#abcd...</span>
                    </div>
                    <br /><br />
                    <div class="people">
                        <h3 class="channel-literal">PEOPLE</h3>
                        <br />
                        <div class="people-list">
                            <span class="person">Gokou</span>
                            <span class="person">Lufi</span>
                        </div>
                    </div>
                </div>
                <div class="main-div">
                    <div class="message-container">
                        <div class="message-list">
                            <div class="message">
                                <div class="pic">
                                    <img src="http://www.gravatar.com/avatar/gokou?s=50&r=pg&d=identicon" alt="user icon" />
                                </div>
                                <div class="message-content">
                                    <span class="sender-username">Gokou</span>
                                    <p class="message-body">
                                        Hello there folks
                            </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-bar">
                        <div class="username">
                            <span>Gokou</span>
                        </div>
                        <div class="message-input">
                            <input type="text" id="msg" placeholder="Enter message and press enter..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Chat;