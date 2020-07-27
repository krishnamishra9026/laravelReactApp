import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class ActiveUserAvatar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			avtar : 'profile.png',
			userID : this.props.userId,
		};  

	}

	componentDidMount(){
		axios.get('/api/users/getprofile/'+this.props.userId)
		.then(response=>{
			this.setState({avtar:response.data});		    
		});
	}

	 componentDidUpdate(prevProps,prevState) {
      if (this.state.userID != prevState.userID) {
      console.log('userId changed ');
   }
 }

    render() {
    	console.log(this.props.userId);
        return (
          <div className="user-avatar">
            <div className="ms-chat-img mr-3 align-self-center">
            { (this.state.avtar === null || this.state.avtar == 'profile.png') ? <img src={'/images/profile.png'} className="ms-img-round" alt="people" /> :<img src={'/uploads/users/'+this.props.userId+'/'+this.state.avtar} className="ms-img-round" alt="people"/> }
            </div>
          </div>
        );
    }
}
