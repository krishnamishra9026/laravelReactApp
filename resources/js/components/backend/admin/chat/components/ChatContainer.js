import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { SET_ACTIVE_USER_ID, SEND_MESSAGE_TO } from './../actions/constants';
import { fetchConversationWith, fetchLastMessages, fetchLastMessageWith } from './../actions/conversationActions';
import { fetchFriends } from './../actions/friendsActions';
import { fetchUser } from './../actions/userActions';
import { TimelineMax, Power4 } from "gsap/TweenMax";

import ActiveUserPanel from './ActiveUserPanel';
import FriendList from './FriendList';
import EventBus from './../EventBus';
import UserPanel from './UserPanel';
import Loader from './Loader';
import Chat from './Chat';


import * as _ from 'lodash';


class ChatContainer extends Component {
    constructor() {
      super();
      this.state = {
        notification: new Audio('/sounds/notification.mp3'),
        loadingConversation: false,
        timeline: new TimelineMax,
        alreadyOpened: {},
      };

      this.startConversation = this.startConversation.bind(this);
    }
    componentDidMount() {
      EventBus.on(SET_ACTIVE_USER_ID, this.startConversation);
      EventBus.on(SEND_MESSAGE_TO, () => {this.props.onFetchConversationWith(this.props.activeUserId)} );

      this.state.timeline.from('.chat-container', 1.3, {
        scale: 0.9,
        opacity: 0,
        ease: Power4.easeOut
      });

      this.props.onFetchFriends();
      this.props.onFetchLastMessages();
      this.props.onFetchUser().then(() => {
        Echo.private(`user-channel.${this.props.user.id}`)
          .listen('MessageSent', (e) => {
            let msg = e.message;

            if(msg.sender_id === this.props.activeUserId)
              this.props.onFetchConversationWith(msg.sender_id, true);
            else
              this.props.onFetchLastMessageWith(msg.sender_id);

            if(!document.hasFocus()) this.state.notification.play();
        });

        Echo.private('global-channel')
          .listen('UserRegistered', (e) => {
            this.props.onFetchFriends();
        });
      });
    }
    startConversation() {
      // Add some conversation caching, to prevent multiple requests in a short time + make app faster
      this.setState({loadingConversation: true});

      this.props.onFetchConversationWith(this.props.activeUserId).then(() => {
        this.setState({loadingConversation: false});

        if(this.state.alreadyOpened[this.props.activeUserId]) return;
        this.state.timeline.staggerFrom('.messages .message', 0.6, {
          opacity: 0,
          y: -30,
          ease: Power4.easeInOut
        }, -0.03);

        let newAlreadyOpened = this.state.alreadyOpened;
        newAlreadyOpened[this.props.activeUserId] = true;
        this.setState({ alreadyOpened: newAlreadyOpened });
      });
    }
    render() {
      if(this.props.user.id)
        return (
            <div className="chat-container z-depth-1">
              <div className="left-section">  
                <div className="ms-content-wrapper">
                  <div className="row">
                    <div className="col-xl-4 col-md-12">
                      <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-body py-3 px-0">
                          <div className="ms-chat-container">
                            <div className="ms-chat-header px-3">
                              <div className="ms-chat-user-container media clearfix">
                                <div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
                                  <img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
                                </div>
                                <div className="media-body ms-chat-user-info mt-1">
                                  <UserPanel />
                                </div>
                              </div>
                            </div>
                            <div className="ms-chat-body">
                              <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active show fade in" id="chats-2">
                                  <ul className="ms-scrollable" style={{ maxHeight:'61vh'}}>
                                    <FriendList />             
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="col-xl-8 col-md-12">
                        <div className="ms-panel ms-chat-conversations ms-widget">                          
                          <div className="ms-panel-body ms-scrollable">
                              {this.props.activeUserId ? (<ActiveUserPanel />) : ''}
                              {!this.state.loadingConversation ? (<Chat />) : (<div className="chat"><Loader/></div>)}
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        );
      else
        return (
          <div className="chat-container z-depth-1">
            <Loader />
          </div>
        )
    }
}

const mapStateToProps = state => ({
  user: state.user,
  friends: state.friends,
  activeUserId: state.activeUserId,
  lastMessages: state.lastMessages
});

const mapActionsToProps = {
  onFetchUser: fetchUser,
  onFetchFriends: fetchFriends,
  onFetchConversationWith: fetchConversationWith,
  onFetchLastMessageWith: fetchLastMessageWith,
  onFetchLastMessages: fetchLastMessages
}

export default connect(mapStateToProps, mapActionsToProps)(ChatContainer);
