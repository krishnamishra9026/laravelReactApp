import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class UserComp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			avtar : 'profile.png',
		};  

	}

	componentDidMount(){
		axios.get('/api/users/getprofile/'+this.props.user_id)
		.then(response=>{
			this.setState({avtar:response.data});		    
		});
	}

    render() {
        return (
          <div className="user-avatar">
            <div className="ms-chat-img mr-3 align-self-center">
            { (this.state.avtar === null || this.state.avtar == 'profile.png') ? <img src={'/images/profile.png'} className="ms-img-round" alt="people" /> :<img src={'/uploads/users/'+this.props.user_id+'/'+this.state.avtar} className="ms-img-round" alt="people"/> }
            </div>
          </div>
        );
    }
}
