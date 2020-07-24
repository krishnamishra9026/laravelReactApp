import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect} from 'react-redux';

class Message extends Component {
    render() {
        let className = 'ms-chat-bubble ms-chat-message ' + (this.props.data.sender_id === this.props.user.id || !this.props.data.sender_id ? 'media ms-chat-outgoing media clearfix' : 'ms-chat-incoming media clearfix');
        let isSent = this.props.data.sender_id ? '' : (<i className="fa fa-paper-plane-o" aria-hidden="true"></i>);
        return (
        <div className="ms-panel-body ms-scrollable">
          <div className={className}>
            <div className="ms-chat-status ms-status-online ms-chat-img">
            <img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
            </div>
              <div className="media-body">
                <div className="ms-chat-text">
                  <p>
                    {this.props.data.body}
                  </p>
                </div>
              <p className="ms-chat-time">10:33 pm</p>
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
