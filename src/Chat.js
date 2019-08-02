import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './store';

import Message from './Message';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        }

        this.pushMessageIntoList = this.pushMessageIntoList.bind(this);
        this.updateUsersList = this.updateUsersList.bind(this);
    }

    componentWillMount() {
        if (! this.props || ! this.props.room.length || ! this.props.username.length)
            window.location.hash = "/";
    }

    componentDidMount() {
        this.props.socket.on('message', this.pushMessageIntoList);
        this.props.socket.on('user-list-update', this.updateUsersList);
    }

    updateUsersList(userlist) {
        var newUserList = JSON.parse(userlist);
        newUserList = newUserList.users || [];
        store.dispatch({ type: 'UPDATE_USER_LIST', data: newUserList });
    }

    pushMessageIntoList(msg) {
        var msg_parsed = JSON.parse(msg);
        if (!msg_parsed.timestamp) msg_parsed.timestamp = new Date().toString();
        this.setState({ messages: this.state.messages.concat(msg_parsed) }, function() {
            const messageListDiv = document.querySelector(".message-list");
            messageListDiv.scrollTop = messageListDiv.scrollHeight;
        });
    }

    render() {
        return (
          <div>
            <div className="chat-page-container">
              <div className="left-div">
                <div>
                  <h3 className="channel-literal">CHANNEL</h3>
                  <br />
                  <span className="channel-name selected">
                    #
                    {this.props.room
                      ? this.props.room.slice(0, 8)
                      : null}
                    ...
                  </span>
                </div>
                <br />
                <br />
                <div className="people">
                  <h3 className="channel-literal">PEOPLE</h3>
                  <br />
                  <div className="people-list">
                    {this.props.currentRoomUsers 
                        ? this.props.currentRoomUsers.map((user, indx) => (<span key={indx} className="person">{user}</span>))
                        : null}
                  </div>
                </div>
              </div>
              <div className="main-div">
                <div className="message-container">
                  <div className="message-list">
                    {this.state.messages 
                        ? this.state.messages.map((msg, indx) => (<Message key={indx} {...msg}></Message>))
                        : null}
                  </div>
                </div>
                <div className="chat-bar">
                  <div className="username">
                    <span>{this.props.username}</span>
                  </div>
                  <div className="message-input">
                    <input
                      type="text"
                      id="msg"
                      placeholder="Enter message and press enter..."
                    />
                  </div>
                </div>
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