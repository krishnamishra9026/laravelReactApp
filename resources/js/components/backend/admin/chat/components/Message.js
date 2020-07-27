import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect} from 'react-redux';


import UserAvatar from './UserAvatar';


import Moment from 'moment'


class Message extends Component {
    render() {

        let senderId = this.props.data.sender_id;
        let recipientId = this.props.data.recipient_id;
        let userId = this.props.user.id;
        let className = 'ms-chat-bubble ms-chat-message ' + (this.props.data.sender_id === this.props.user.id || !this.props.data.sender_id ? 'media ms-chat-outgoing media clearfix' : 'ms-chat-incoming media clearfix');
        let isSent = this.props.data.sender_id ? '' : (<i className="fa fa-paper-plane-o" aria-hidden="true"></i>);
        return (
        <div className="ms-panel-body ms-scrollable">
          <div className={className}>
            <div className="ms-chat-img">
            {(senderId === recipientId ) ? <UserAvatar user_id={recipientId} /> : <UserAvatar user_id={senderId} />}
            </div>
              <div className="media-body">
                <div className="ms-chat-text">
                  <p>
                    {this.props.data.body}
                  </p>
                </div>
              <p className="ms-chat-time">{ (senderId === userId && this.props.data.read_at !== null) ? <i className="fa fa-check" style={{ color:'red'}} aria-hidden="true"></i> : '' }{Moment(this.props.data.created_at).format('MMM-DD-YYYY HH:mm a')}</p>
              </div>
          </div>      
        </div>
        );
    }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Message);
