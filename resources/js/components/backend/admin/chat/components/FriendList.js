import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { filterFriends } from "../actions/friendsActions";

import Friend from './Friend';

class FriendList extends Component {
    render() {
        let friends = this.props.friends.map((friend, index) => {
            return (
              <Friend name={friend.name} image={friend.avater} active={this.props.activeUserId === friend.id} lastMessage={this.props.lastMessages[friend.id]} id={friend.id} key={index}/>
            )
        });

        return (
          <div className="friend-list">
          <hr/>
          <div className="ms-form-group my-0 mb-0 has-icon fs-14">
          <input type='text' className="ms-form-input w-100" placeholder='search' value={this.props.name}
            onChange={(e) => {
                this.props.filterFriends(
                  e.target.value
                );
            }}></input>
                    </div>
                    <br/>
                    <ul className="ms-scrollable" style={{ maxHeight:'61vh'}}>
            <hr/>
            { friends }
             </ul>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  friends: state.friends,
  name: state.friends.name,
  lastMessages: state.lastMessages,
  activeUserId: state.activeUserId
});


export default connect(mapStateToProps,{filterFriends})(FriendList);
