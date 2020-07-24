import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Friend from './Friend';

class FriendList extends Component {
    render() {
        let friends = this.props.friends.map((friend, index) => {
            return (
              <Friend name={friend.name} active={this.props.activeUserId === friend.id} lastMessage={this.props.lastMessages[friend.id]} id={friend.id} key={index}/>
            )
        });

        return (
          <div className="friend-list">
          <hr/>
            <form  style={{ display:'none'}} className="ms-form my-3" method="post">
              <div className="ms-form-group my-0 mb-0 has-icon fs-14">
                <input type="search" className="ms-form-input w-100" name="search" placeholder="Search for People and Groups" defaultValue />
                <i className="flaticon-search text-disabled" />
              </div>
            </form>
            <hr/>
            { friends }
          </div>
        );
    }
}

const mapStateToProps = state => ({
  friends: state.friends,
  lastMessages: state.lastMessages,
  activeUserId: state.activeUserId
});


export default connect(mapStateToProps)(FriendList);
