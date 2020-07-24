import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { addLocalMsgToConversation } from './../actions/conversationActions';
import { setMessage, sendMessageTo } from './../actions/messageActions';
import { SET_ACTIVE_USER_ID, SEND_MESSAGE_TO } from './../actions/constants';

import EventBus from './../EventBus';
import Message from './Message';
import Welcome from './Welcome';

class Chat extends Component {
    constructor(props) {
      super(props);

      this.updateMessage = this.updateMessage.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
    }
    componentDidMount() {
      this.scrollToBottom();
    }
    componentDidUpdate(props) {
      this.scrollToBottom();
    }
    scrollToBottom() {
      let div = document.querySelector(".messages");
      if(div) div.scrollTop = div.scrollHeight * 2;
    }
    updateMessage(e) {
      this.props.onUpdateMessage(e.target.value);
    }
    sendMessage() {
      if(!this.props.message) return;

      this.props.onAddLocalMsgToConversation(this.props.message).then(() => {
        this.props.onSendMessage(this.props.activeUserId).then(() => {
          EventBus.emit(SEND_MESSAGE_TO);
        });
        this.refs.input.value = '';
        this.props.onUpdateMessage('');
      });
    }
    render() {
        let messages = this.props.conversation.map((message, index) => {
          return (
            <Message data={message} key={index}></Message>
          )
        });

        if(this.props.activeUserId)
          return (
            <div className="chat">
              <div className="messages styled-scrollbar">
                { messages }
              </div>

              <div className="ms-panel-footer pt-3 pb-2">
                <div className="ms-chat-textbox">
                  <ul className="ms-list-flex mb-0">
                    <li className="ms-chat-input">
                      <input type="text" ref="input" onInput={this.updateMessage} onKeyPress={e => {if(e.key === 'Enter') this.sendMessage();} } />
                    </li>
                    <li>
                      <ul className="ms-chat-text-controls ms-list-flex">
                        <li onClick={this.sendMessage}> <i className="fa fa-paper-plane" aria-hidden="true"></i> </li>
                       </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        else
          return (
            <Welcome />
          )

    }
}

const mapStateToProps = state => ({
  conversation: state.conversation,
  user: state.user,
  message: state.message,
  activeUserId: state.activeUserId
});

const mapActionsToProps = {
  onUpdateMessage: setMessage,
  onSendMessage: sendMessageTo,
  onAddLocalMsgToConversation: addLocalMsgToConversation
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
