import React from 'react';
import PropTypes from 'prop-types';

function SystemMessage(props) {
    return (
        <div className="message">
            <p className="muted italic">{props.message}</p>
        </div>
    );
}

SystemMessage.propTypes = {
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
}

export default SystemMessage;