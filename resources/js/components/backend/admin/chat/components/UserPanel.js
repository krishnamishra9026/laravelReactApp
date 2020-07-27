import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import UserAvatar from './UserAvatar';

class UserPanel extends Component {
    constructor() {
      super();

      this.state = {
        menuOpen: false
      }

      this.toggleMenu = this.toggleMenu.bind(this);
      this.logout = this.logout.bind(this);
    }
    toggleMenu() {
      this.setState({
        menuOpen: !this.state.menuOpen
      });
    }
    logout() {
      this.refs.form.submit();
    }
    render() {
        let menu = this.state.menuOpen ? (<ul className="collection menu">
              <li className="collection-item"><a href="#" onClick={this.logout}>Logout</a></li>
              </ul>) : '';
        return (
            <div className="user-panel">
              <div className="ms-chat-header px-3">
                <div className="ms-chat-user-container media clearfix">
                  <div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
                    <UserAvatar user_id={this.props.user.id} />
                  </div>
                  <div className="media-body ms-chat-user-info mt-1">
                    <div className="user-info">
                      <div className="user-text">
                        <div className="user-name">
                          {this.props.user.name}
                        </div>
                        <div className="user-email">
                          {this.props.user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserPanel);
