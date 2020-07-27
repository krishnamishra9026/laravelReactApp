require('./bootstrap');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatContainer from './components/ChatContainer';
import { Provider } from 'react-redux';
import store from './store';

import './styles/app.css';

class ChatApp extends Component {
    render() {
          return (
            <Provider store={store}>
              <React.Fragment>
                <div className="top-bar"></div>
                <ChatContainer />
              </React.Fragment>
            </Provider>
          );
    }
}

export default ChatApp;
