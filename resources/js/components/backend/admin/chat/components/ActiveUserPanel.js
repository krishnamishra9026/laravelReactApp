import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import UserPanel from './UserPanel';


import ActiveUserAvatar from './ActiveUserAvatar';

class ActiveUserPanel extends Component {
  render() {
      return (
         <div className="ms-panel-header">
            <div className="ms-chat-header justify-content-between">
              <div className="ms-chat-user-container media clearfix">
                <div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
                  
                <div className="user-avatar">
                  <div className="ms-chat-img mr-3 align-self-center">
                    { (this.props.profile === null || this.props.profile == 'profile.png') ? <img src={'/images/profile.png'} className="ms-img-round" alt="people" /> :<img src={'/uploads/users/'+this.props.user.id+'/'+this.props.profile} className="ms-img-round" alt="people"/> }
                  </div>
                </div>

                </div>
                <div className="media-body ms-chat-user-info mt-1">
                  <h6>{this.props.user.name}</h6>
                  <span className="text-disabled fs-12">
                    Active Now
                  </span>
                </div>
              </div>
            </div>
          </div>
      );
  }
}

const mapStateToProps = state => ({
  user: state.friends.find(({id}) => id === state.activeUserId),
  profile: state.activeUserProfile
});


export default connect(mapStateToProps)(ActiveUserPanel)
