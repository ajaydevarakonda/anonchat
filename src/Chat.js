import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import { Beforeunload } from 'react-beforeunload';

import store from './store';
import Message from './Message';
import SystemMessage from './SystemMessage';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
      usernameSuggestions: [],
      showUsernameSuggestions: false,
      selectedUsernameSuggestion: -1,
      isModalOpen: false,
    };

    this.pushMessageIntoList = this.pushMessageIntoList.bind(this);
    this.pushSystemMessageIntoList = this.pushSystemMessageIntoList.bind(this);
    this.scrollToEndOfMessages = this.scrollToEndOfMessages.bind(this);
    this.updateUsersList = this.updateUsersList.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.copyRoomName = this.copyRoomName.bind(this);
    this.onMessageKeyDown = this.onMessageKeyDown.bind(this);
  }

  componentWillMount() {
    if (!this.props || !this.props.room.length || !this.props.username.length)
      window.location.hash = "/";
  }

  componentDidMount() {
    Notification.requestPermission();

    this.props.socket.on("user-message", this.pushMessageIntoList);
    this.props.socket.on("system-message", this.pushSystemMessageIntoList);
    this.props.socket.on("user-list-update", this.updateUsersList);

    const modal = document.getElementById("hash-share-modal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];
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

    // show user a notification if his name is mentioned
    if (Notification.permission && new RegExp(this.props.username).test(msg_parsed.message)) {
      new Notification(`${msg_parsed.username} has mentioned you in chat!`);
      const beeper = document.querySelector("#beeper");
      if (beeper) { beeper.play(); }
    }

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

  onMessageChange(e) {
    this.setState({ message: e.target.value }, () => {
      if (this.state.showUsernameSuggestions) {
        const regexp = `${this.state.message.split("@")[1]}.*`;
        const matchedUsernames = this.props.currentRoomUsers.filter(
          uname =>
            new RegExp(regexp, "i").test(uname) &&
            uname !== this.props.username
        );

        matchedUsernames && matchedUsernames.length
          ? this.setState({ usernameSuggestions: matchedUsernames, selectedUsernameSuggestion: 0 })
          : this.setState({ showUsernameSuggestions: false }); // back to normal.
      }
    });
  }

  onMessageKeyDown(e) {
    console.log(e.keyCode)
    // @ is pressed
    if (e.keyCode === 50 && e.shiftKey) {
      this.setState({ showUsernameSuggestions: true }, this.showUsernameSuggestions);
    }
    // when usernames suggestions are being shown and TAB or ENTER is pressed.
    else if (this.state.showUsernameSuggestions && (e.keyCode === 9 || e.keyCode === 13)) {
      e.preventDefault();
      this.setState({
        message:
          this.state.message.split("@")[0] +
          "@" +
          this.state.usernameSuggestions[
            this.state.selectedUsernameSuggestion
          ],
        showUsernameSuggestions: false,
      });
    }
    // when usernames suggestions are being shown and UP arrow key is pressed.
    else if (this.state.showUsernameSuggestions && e.keyCode === 38) {
      e.preventDefault();
      if (this.state.selectedUsernameSuggestion <= 0) {
        return;
      }
      else {
        this.setState({
          selectedUsernameSuggestion:
            this.state.selectedUsernameSuggestion - 1
        });
      }
    }
    // when usernames suggestions are being shown and DOWN arrow key is pressed.
    else if (this.state.showUsernameSuggestions && e.keyCode === 40) {
      e.preventDefault();
      if (
        this.state.selectedUsernameSuggestion >=
        this.state.usernameSuggestions.length - 1
      )
      {
        return;
      }
      else {
        this.setState({
          selectedUsernameSuggestion:
            this.state.selectedUsernameSuggestion + 1
        });
      }
    }
    // space is pressed
    else if (e.keyCode === 32) {
      this.setState({ showUsernameSuggestions: false });
    }
  }

  render() {
    return (
      <div className="fadein-right">
        <Beforeunload onBeforeunload={event => event.preventDefault()} />
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
              <a
                id="myBtn"
                onClick={() => this.setState({ isModalOpen: true })}
                className="special"
              >
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
                  transitionName="react-fadein"
                  transitionEnterTimeout={100}
                >
                  {this.state.messages
                    ? this.state.messages.map((msg, indx) =>
                        msg.username ? (
                          <Message key={indx} {...msg} />
                        ) : (
                          <SystemMessage key={indx} {...msg} />
                        )
                      )
                    : null}
                </CSSTransitionGroup>
              </div>
            </div>
            <div className="chat-bar">
              {this.state.showUsernameSuggestions &&
              this.state.usernameSuggestions.length ? (
                <div className="username-suggestions">
                  {this.state.usernameSuggestions.map(
                    (suggestion, indx) => 
                      (<div className={ "suggested-username" + " " + (indx === this.state.selectedUsernameSuggestion ? "active" : "") } key={indx}>
                        @{suggestion}
                      </div>)
                  )}
                </div>
              ) : null}
              <div className="message-input">
                <form onSubmit={this.sendMessage}>
                  <input
                    type="text"
                    id="msg"
                    placeholder="Enter message and press enter..."
                    autoComplete="off"
                    onChange={this.onMessageChange}
                    onKeyDown={this.onMessageKeyDown}
                    value={this.state.message}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ============ Modal =============*/}
        <div
          id="hash-share-modal"
          className={
            "modal" + (this.state.isModalOpen ? " modal-active" : "")
          }
        >
          <div className="modal-content">
            <span
              className="close"
              onClick={() => this.setState({ isModalOpen: false })}
            >
              &times;
            </span>

            <p>
              Note: Share the below hash to any user and ask them to input
              at home page
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