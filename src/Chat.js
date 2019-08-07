import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

import store from './store';
import Message from './Message';
import SystemMessage from './SystemMessage';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.pushMessageIntoList = this.pushMessageIntoList.bind(this);
    this.pushSystemMessageIntoList = this.pushSystemMessageIntoList.bind(this);
    this.scrollToEndOfMessages = this.scrollToEndOfMessages.bind(this);
    this.updateUsersList = this.updateUsersList.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.copyRoomName = this.copyRoomName.bind(this);
  }

  componentWillMount() {
    if (!this.props || !this.props.room.length || !this.props.username.length)
      window.location.hash = "/";
  }

  componentDidMount() {
    this.props.socket.on("user-message", this.pushMessageIntoList);
    this.props.socket.on("system-message", this.pushSystemMessageIntoList);
    this.props.socket.on("user-list-update", this.updateUsersList);

    const modal = document.getElementById("hash-share-modal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
      modal.style.display = "block";
    };

    span.onclick = function() {
      modal.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  updateUsersList(userlist) {
    var newUserList = JSON.parse(userlist);
    newUserList = newUserList.users || [];
    store.dispatch({ type: "UPDATE_USER_LIST", data: newUserList });
  }

  pushSystemMessageIntoList(msg) {
    if ((typeof msg).toLowerCase() !== "string" || !msg.length)
        return false;

    this.setState(
      {
        messages: this.state.messages.concat({
          message: msg,
          username: null,
          timestamp: new Date().toString()
        })
      },
      function() {
        const messageListDiv = document.querySelector(".message-list");
        messageListDiv.scrollTop = messageListDiv.scrollHeight;
      }
    );
  }

  scrollToEndOfMessages() {
    const messageListDiv = document.querySelector(".message-list");
    messageListDiv.scrollTop = messageListDiv.scrollHeight;
  }

  pushMessageIntoList(msg) {
    var msg_parsed = JSON.parse(msg);
    const messagesLength = this.state.messages.length;
    const lastMessage = this.state.messages[messagesLength - 1];

    // TODO: Clear out any malicious content from the msg_parsed here.
    if (!msg_parsed.timestamp)
      msg_parsed.timestamp = new Date().toString();

    if (
      messagesLength &&
      msg_parsed.username &&
      lastMessage.username === msg_parsed.username
    ) {
      lastMessage.message += `<br/>${msg_parsed.message}`;
      this.setState(
        { messages: this.state.messages.slice(0, messagesLength - 1).concat(lastMessage) },
        this.scrollToEndOfMessages
      );
    }
    else {
      this.setState(
        { messages: this.state.messages.concat(msg_parsed) },
        this.scrollToEndOfMessages
      );
    }
  }

  sendMessage(e) {
    e.preventDefault();
    const messageDiv = document.querySelector("#msg");
    const message = messageDiv.value;
    if (!message || !message.length) return false;
    this.props.socket.emit(
      "user-message",
      JSON.stringify({
        message,
        room: this.props.room
      })
    );
    messageDiv.value = "";
  }

  copyRoomName() {
    const roomHashDiv = document.querySelector("#share-room-hash");
    if (!roomHashDiv) return false;
    const roomName = this.props.room;
    if (!roomName) return false;
    roomHashDiv.select();
    document.execCommand("copy", true);
    console.log("Copied!");
  }

  render() {
    return (
      <div className="fadein-right">
        <div className="chat-page-container">
          <div className="left-div">
            <div>
              <h3 className="channel-literal">CHANNEL</h3>
              <br />
              <span className="channel-name selected">
                #{this.props.room ? this.props.room.slice(0, 8) : null}
                ...
              </span>
              <br />
              <a id="myBtn" className="special">
                Invite a user
              </a>
            </div>
            <br />
            <br />

            <div className="people">
              <h3 className="channel-literal">PEOPLE</h3>
              <br />
              <div className="people-list">
                {this.props.currentRoomUsers
                  ? this.props.currentRoomUsers.map((user, indx) => (
                      <span key={indx} className="person">
                        {user}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className="main-div">
            <div className="message-container">
              <div className="message-list">
                <CSSTransitionGroup
                  transitionName="chat-message"
                  transitionEnterTimeout={100}>
                {this.state.messages
                    ? this.state.messages.map((msg, indx) =>
                        msg.username 
                            ? (<Message key={indx} {...msg} />) 
                            : (<SystemMessage key={indx} {...msg} />))
                    : null}
                </CSSTransitionGroup>
              </div>
            </div>
            <div className="chat-bar">
              <div className="username">
                <span>{this.props.username}</span>
              </div>
              <div className="message-input">
                <form onSubmit={this.sendMessage}>
                  <input
                    type="text"
                    id="msg"
                    placeholder="Enter message and press enter..."
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ============ Modal =============*/}
        <div id="hash-share-modal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>

            <p>
              Note: Share the below hash to any user and ask them to input at
              home page
            </p>
            <input
              type="text"
              id="share-room-hash"
              defaultValue={this.props.room}
            />
            <button id="copy-btn" onClick={this.copyRoomName}>
              Copy
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return { ...state };
};
    
export default connect(mapStateToProps)(Chat);