import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom'
import './Chat.less';
import $ from "axios";
let firebase = require('firebase');
var config = {
  apiKey: "AIzaSyBISfTKByygQKiaPfHCeH6ntXiuEI8h1sE",
  authDomain: "wheevy-dc03f.firebaseapp.com",
  databaseURL: "https://wheevy-dc03f.firebaseio.com",
  projectId: "wheevy-dc03f",
  storageBucket: "wheevy-dc03f.appspot.com",
  messagingSenderId: "41716734772"
};
firebase.initializeApp(config);


var Buttons = React.createClass({

  getInitialState: function() {
    return {
      activeUsers: [],
      userClick: '',
      message: ''
    };
  },

  componentDidMount: function() {

    ///api call to database for list of online users
    $({
      method: 'get',
      url: '/users/active'
    }).then((response) => {
      console.log('number of user: ', response);
      console.log(response.data.activeUsers.length);
      this.setState({
        activeUsers: response.data.activeUsers
      });
    }).catch((error) => {
      console.log(error)
    });

  },

  clickToChat: function(user, e){
    console.log('hi this click is working', user.username);
    this.setState({
      userClick: user.username
    })
  },

  textMessage: function(e){
    this.setState({
      message: e.target.value
    })
  },
  sendMessage: function(){
    console.log(firebase);
    console.log(this.state.message);
    let firebaseRef = firebase.database().ref();
    let messageText = this.state.message;
    firebaseRef.child('text').set(messageText);
  },

  render: function() {
    return (
      <div className="ui">
  <div className="left-menu">
    <form action="#" className="search">
      <input placeholder="search..." type="search" name id />
      <input type="submit" defaultValue="" />
    </form>
    <menu className="list-friends">
      {
        this.state.activeUsers.map((user, id) =>{
          let boundUserClick = this.clickToChat.bind(this, user)
          return(
            <li  key={id}>
              <a className="info" role='button'>
                <div className="user" onClick={boundUserClick}>{user.username}</div>
                <div className="status on"> online</div>
              </a>
            </li>
          )
        })
      }
    </menu>
  </div>
  <div className="chat">
    <div className="top">
      <div className="avatar">
      </div>
      <div className="info">
        <div className="name">{this.state.userClick}</div>
      </div>
      <i className="fa fa-star" />
    </div>
    <ul className="messages">
      <li className="i">
        <div className="head">
          <span className="time">10:13 AM, Today</span>
          <span className="name">Буль</span>
        </div>
        <div className="message">Привет!</div>
      </li>
      <li className="friend-with-a-SVAGina">
        <div className="head">
          <span className="name">Юния</span>
          <span className="time">10:15 AM, Today</span>
        </div>
        <div className="message">чего тебе?</div>
      </li>
    </ul>
    <div className="write-form">
      <textarea placeholder="Type your message" value={this.state.value} onChange={this.textMessage} name="e" id="texxt" rows={2} defaultValue={""} />
      <i className="fa fa-picture-o" />
      <i className="fa fa-file-o" />
      <span className="send" onClick={this.sendMessage}>Send</span>
    </div>
  </div>
</div>

    );
  },


});


export default Buttons;
