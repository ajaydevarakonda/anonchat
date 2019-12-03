import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import './Message.css';

export const Message = (props) => (
    <div className="messageWrapper">
        <img
            className="profilePic"
            src={`http://www.gravatar.com/avatar/${props.username}?s=50&r=pg&d=identicon`}
            alt="user icon"
          />
        <div className="message">
          <div className="userWrapper">
            <div className="username">{props.username}</div>
            <div className="muted">{new Date(props.timestamp).toLocaleString()}</div>
          </div>
            {parse(props.message)}
        </div>
    </div>
);

Message.propTypes = {
    username: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
};
