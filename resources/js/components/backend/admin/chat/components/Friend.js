import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Moment from 'moment'

import { setActiveUserId } from './../actions/conversationActions';
import { SET_ACTIVE_USER_ID } from './../actions/constants';
import EventBus from './../EventBus';



class Friend extends Component {
    constructor(props) {
      super(props);

      this.setActiveUser = this.setActiveUser.bind(this);
    }
    setActiveUser() {
      this.props.onSetActiveUserId(this.props.id).then(() => {
        EventBus.emit(SET_ACTIVE_USER_ID);
      });
    }
    render() {
        let classNames = 'friend-card' + (this.props.active ? ' active' : '');
        return (
           <div className={classNames} onClick={this.setActiveUser}>
            <li className="ms-chat-user-container ms-open-chat ms-deletable p-3 media clearfix">
              <div className="ms-chat-img mr-3 align-self-center">
               { (this.props.image === null) ? <img src={'/images/profile.png'} className="ms-img-round" alt="people" /> : <img src={'/uploads/users/'+this.props.id+'/'+this.props.image} className="ms-img-round" alt="people" /> }
              </div>
              <div className="media-body ms-chat-user-info mt-1">
                <h6>{this.props.name}</h6> 
                <span className="ms-chat-time"> {this.props.lastMessage ? this.props.lastMessage.body : ''}
                  <br/><span className="time">
                    { this.props.lastMessage ?  Moment(this.props.lastMessage.created_at).format('MMM-DD-YYYY') : ''}
                  </span>
                </span>
                <p>{!this.props.lastMessage || Moment(this.props.lastMessage.read_at).format('MMM-DD-YYYY')
                  || this.props.lastMessage.sender_id !== this.props.id ? '' : <span className="new badge" data-badge-caption="unread"> </span>}</p>
                </div>
              </li>    
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  onSetActiveUserId: setActiveUserId
};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
