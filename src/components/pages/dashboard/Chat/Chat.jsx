import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom'
import './Chat.less';
import $ from "axios";
import firebase from 'firebase';
import moment from 'moment';
////firebase connection
let config = {
  apiKey: "AIzaSyBISfTKByygQKiaPfHCeH6ntXiuEI8h1sE",
  authDomain: "wheevy-dc03f.firebaseapp.com",
  databaseURL: "https://wheevy-dc03f.firebaseio.com",
  projectId: "wheevy-dc03f",
  storageBucket: "wheevy-dc03f.appspot.com",
  messagingSenderId: "41716734772"
};
firebase.initializeApp(config);
///compoent for chat

var Buttons = React.createClass({

  getInitialState: function() {
    return {
      activeUsers: [],
      userClick: '',
      message: '',
      username: '',
      time: null,
      messageArray: null
    };
  },

  componentDidMount: function() {
    ///api call for current users
    $({
      method: 'get',
      url: '/getuser'
    }).then((response) => {
      this.setState({
        username: response.data.username
      })
    });
    ///api call to database for list of online users
    $({
      method: 'get',
      url: '/users/active'
    }).then((response) => {
      this.setState({
        activeUsers: response.data.activeUsers
      });
    }).catch((error) => {
      console.log(error)
    });
    ///firebase connection to obtain messages
    const ref = firebase.database().ref().child('messages');
    var messagesArray = [];
    ref.once('value')
      .then((snapshot)=>{
      let messages = snapshot.val();
      let array = Object.keys(messages).map(key => messages[key]);
      console.log(array, "the messages array variable works in this scope");
      this.setState({
        messageArray: array
      });
    });
  },

  clickToChat: function(user, e){
    console.log('hi this click is working', user.username);
    this.setState({
      userClick: user.username
    });
      console.log(this.state.messageArray, "checking state of messages array ")

    // let ref = firebase.database().ref().child('messages');
    // var messagesArray = [];
    // ref.on('value', function(snapshot){
    //   let messages = snapshot.val();
    //   let array = Object.keys(messages).map(key => messages[key]);
    //   for(var i = 0; i < array.length; i++){
    //     if(array[i].user === user.username){
    //       messagesArray.push(array[i]);
    //     };
    //   };
    //   console.log(array);
    //   console.log(messagesArray, "the messages array variable works in this scope");
    //   this.setState({
    //     messageArray: messagesArray
    //   }).bind(this);
    // }).bind(this);
  },

  textMessage: function(e){
    this.setState({
      message: e.target.value
    })
  },
  sendMessage: function(){
    let firebaseRef = firebase.database().ref().child('messages');
    let valueOfMessages = {
      message: this.state.message,
      name: this.state.username,
      time: Date.now(),
      user: this.state.userClick

    };
    firebaseRef.push().set(valueOfMessages);
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
      {
        this.state.messageArray &&
        this.state.messageArray.map((user,id) => {
          return (
            <li className="i" key={id}>
              <div className="head">
                <span className="time">{user.time}</span>
                <span className="name">{user.name}</span>
              </div>
              <div className="message">{user.message}</div>
            </li>
          )
        })
      }
          {/*
          <li className="friend-with-a-SVAGina">
            <div className="head">
              <span className="name">Юния</span>
              <span className="time">10:15 AM, Today</span>
            </div>
            <div className="message">чего тебе?</div>
          </li> */}
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
