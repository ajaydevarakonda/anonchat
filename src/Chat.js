import React from 'react';
import { Beforeunload } from 'react-beforeunload';

import ChatMessage from './ChatMessage';
import ChatContext from './ChatContext';


class Chat extends React.Component {
    constructor(props) {
        super(props);

        console.log("works upto here")

        this.state = {
            messages: [],
        };

        this.showAlert = props.showAlert.bind(this);
        this.setContextState = props.setContextState.bind(this);

        this.showAlert = props.showAlert.bind(this);
        this.showInviteModal = this.showInviteModal.bind(this);

        this.copyRoomName = this.copyRoomName.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.pushMessageIntoList = this.pushMessageIntoList.bind(this);
        this.updateUsersList = this.updateUsersList.bind(this);
    }

    componentWillMount() {
        if (! this.context || ! this.context.room || ! this.context.username)
            window.location = "/";
    }

    componentDidMount() {
        // we will not recieve any messages unless we join a room.
        this.context.socket.on('message', this.pushMessageIntoList);
        this.context.socket.on('user-list-update', this.updateUsersList);

        // const roomShareField = document.querySelector("#share-room-hash");
        //TODO: fix issue with mdl method
        // roomShareField.MaterialTextfield.change(this.context.room);
    }

    componentDidUpdate() {
        const chatDiv = document.querySelector("#chat");
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }

    sendMessage(e) {
        e.preventDefault();
        const messageDiv = document.querySelector("#message")
        const message = messageDiv.value;
        if (!message || !message.length) return false;
        this.context.socket.emit("user-message", JSON.stringify({
            message,
            room: this.context.room, 
        }));
        messageDiv.MaterialTextfield.change("");
        messageDiv.blur();
    }

    pushMessageIntoList(msg) {
        var msg_parsed = JSON.parse(msg);
        if (!msg_parsed.timestamp) msg_parsed.timestamp = new Date().toString();
        const messages = this.state.messages || [];
        this.setState({ messages: messages.concat(msg_parsed) })
    }

    updateUsersList(userlist) {
        var newUserList = JSON.parse(userlist);
        newUserList = newUserList.users || [];
        this.setState({ currentRoomUsers: newUserList })
    }

    showInviteModal() {
        var dialog = document.querySelector('dialog');
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function () {
            dialog.close();
        }, { once: true }); // prevents adding too many eventlisteners
    }

    copyRoomName() {
        document.querySelector("#share-room-hash").select();
        document.execCommand("copy", true, this.context.room);
        this.showAlert("Copied!", 1000);
    }

    render() {
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
                <Beforeunload onBeforeunload={event => event.preventDefault()} />
                <div className="mdl-cell mdl-cell--8-col chatbox">
                    <div id="chatbox-literal">
                        <h6>
                            #{this.context.room.slice(0, 12)}...
                            &nbsp;&nbsp;
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                                disabled={false}
                                id="invite-button"
                                onClick={this.showInviteModal}
                            >
                                Invite
                            </button>
                        </h6>
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
                        <span id="username">{this.context.username}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="mdl-textfield mdl-js-textfield message-textfield">
                            <input className="mdl-textfield__input" type="text" id="message" autoComplete="off" />
                            <label className="mdl-textfield__label" htmlFor="message">Message</label>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                            id="send-button"
                            disabled={false}
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
                        <h6>Users - {this.context.numberOfUsersInCurrentRoom}</h6>
                    </div>
                    <div id="users">
                        {this.context.currentRoomUsers.map((user, indx) => (
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

        {/* ==========================================================================
            MODAL */}
          <dialog className="mdl-dialog" id="join-dialog">
            <div className="mdl-dialog__content">
                <p>Send the new user below code and ask to put this code at the homepage.</p>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="share-room-hash"/>
                    <label className="mdl-textfield__label" htmlFor="hash">Chat room hash</label>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.copyRoomName}>
                    <i className="fa fa-copy" aria-hidden="true" />                        
                </button>
            </div>
            <div className="mdl-dialog__actions mdl-dialog__actions--full-width">
                <button type="button" className="mdl-button close">Close</button>
            </div>
        </dialog>
    </div>);
    }
}

Chat.contextType = ChatContext;
export default Chat;
