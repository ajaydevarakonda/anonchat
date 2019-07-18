import React from 'react';
import openSocket from 'socket.io-client';

import './Chat.css';
import ChatMessage from './ChatMessage';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: [],
            socket: openSocket("http://localhost:3300"),
            username: null,
            room: null,
            currentRoomUsers: null,
            numberOfUsersInCurrentRoom: null,
        };

        this.showAlert = this.showAlert.bind(this);
        this.messageInputChange = this.messageInputChange.bind(this);

        this.joinChat = this.joinChat.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.pushMessageIntoList = this.pushMessageIntoList.bind(this);
    }

    componentDidMount() {
        // we will not recieve any messages unless we join a room.
        this.state.socket.on('message', this.pushMessageIntoList);
    }

    componentDidUpdate() {
        const chatDiv = document.querySelector("#chat");
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }

    sendMessage(e) {
        e.preventDefault();
        const message = document.querySelector("#message").value;
        if (!message || !message.length) return false;
        this.state.socket.emit("user-message", JSON.stringify({
            message,
            room: this.state.room, 
        }));
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

    showAlert(message, timeout = 4000) {
        var snackBar = document.querySelector('#toast');
        var data = { message, timeout };
        snackBar.MaterialSnackbar.showSnackbar(data);
    }

    joinChat(e) {
        const self = this;
        e.preventDefault();
        const hashInput = document.querySelector("#hash");
        const hash = hashInput.value;
        const isValidHash = hash.length && (/^[A-Za-z0-9]{64,}$/.test(hash));

        if (!isValidHash) {
            // check if the hash is valid
            this.showAlert("Error: Invalid hash!")
            return false;
        } else {
            this.showAlert("Loading chat ...");
            this.state.socket.emit('join', hash);
            this.state.socket.on('join-fail', function () {
                self.showAlert("Error: Invalid hash!");
            });
            this.state.socket.on('join-ack', function (msg) {
                const { room, username, users, numberOfUsers } = JSON.parse(msg);
                self.setState({
                    room, username, currentRoomUsers:users, numberOfUsersInCurrentRoom: numberOfUsers,
                })
            });
        }
    }

    renderChatPage() {
        console.log(this.state.messages)
        return (<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            {/* ======================================================================
                MAIN CONTENT */}
            <main className="mdl-layout__content">
                <div className="mdl-grid mdl-grid--no-spacing">
                    {/* ==================================================================
                            SIDENAV  */}
                    <div className="mdl-cell mdl-cell--2-col sidenav vh100 text-center">
                        <h5>ANONCHAT</h5>
                    </div>
                    {/* ==================================================================
                        /SIDENAV  */}

                    {/* ==================================================================
                        CHATBOX */}
                    <div className="mdl-cell mdl-cell--8-col chatbox">
                        <div id="chatbox-literal">
                            <h6>#{this.state.room.slice(0, 12)}...</h6>
                        </div>

                        {/* ==============================================================
                            CHAT MESSAGES */}
                        <div id="chat">
                            {this.state.messages.map((message, indx) => (
                                <ChatMessage
                                    sender={message.username}
                                    key={indx}
                                    message={message.message}
                                    timestamp={message.timestamp}
                                />
                            ))}
                        </div>

                        {/* ==============================================================
                            SEND MESSAGE */}
                        <form id="message-form" onSubmit={this.sendMessage}>
                            <span id="username">{this.state.username}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="mdl-textfield mdl-js-textfield message-textfield">
                                <input
                                    className="mdl-textfield__input"
                                    type="text"
                                    id="message"
                                    onChange={this.messageInputChange}
                                    value={this.state.message}
                                    autoComplete="off"
                                />
                                <label
                                    className="mdl-textfield__label"
                                    htmlFor="message"
                                >
                                    Message
                            </label>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                id="send-button"
                                disabled={
                                    !this.state.message && !this.state.message.length
                                }
                            >
                                <i className="fa fa-paper-plane" aria-hidden="true" />
                            </button>
                        </form>
                    </div>
                    {/* ==================================================================
                        /CHATBOX */}


                    {/* ==================================================================
                        USERS */}
                    <div className="mdl-cell mdl-cell--2-col userlist">
                        <div id="users-literal">
                            <h6>Users - {this.state.numberOfUsersInCurrentRoom}</h6>
                        </div>
                        <div id="users">
                            {this.state.currentRoomUsers.map((user, indx) => (
                                <div className="user" key={indx}>{user}</div>
                            ))}
                        </div>
                    </div>
                    {/* ==================================================================
                        /USERS */}
                </div>
            </main>
            {/* ==========================================================================
                /MAIN CONTENT */}
        </div>);
    }

    renderJoinPage() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                {/* ======================================================================
                MAIN CONTENT */}
                <main className="mdl-layout__content">
                    <div className="mdl-grid mdl-grid--no-spacing">
                        {/* ==================================================================
                            SIDENAV  */}
                        <div className="mdl-cell mdl-cell--2-col sidenav vh100 text-center">
                            <h5>ANONCHAT</h5>
                        </div>
                        {/* ==================================================================
                            /SIDENAV  */}

                        {/* ==================================================================
                            JOIN */}
                        <div className="mdl-cell mdl-cell--10-col joinform">
                            <form onSubmit={this.joinChat}>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" id="hash" />
                                    <label className="mdl-textfield__label" htmlFor="hash">Chat room hash</label>
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                                            Join
                                </button>
                            </form>
                        </div>
                        {/* ==================================================================
                            /JOIN */}
                    </div>
                </main>
                {/* ==========================================================================
                /MAIN CONTENT */}
            </div>
        );
    }

    render() {
        console.log("rendered")
        return this.state.username && this.state.room
            ? this.renderChatPage()
            : this.renderJoinPage();
    }
}

export default Chat;
