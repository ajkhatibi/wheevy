import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron,  } from 'react-bootstrap';
import * as firebase from 'firebase';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyBISfTKByygQKiaPfHCeH6ntXiuEI8h1sE",
   authDomain: "wheevy-dc03f.firebaseapp.com",
   databaseURL: "https://wheevy-dc03f.firebaseio.com",
   storageBucket: "wheevy-dc03f.appspot.com",
   messagingSenderId: "41716734772"
 };

 firebase.initializeApp(config);

var Buttons = React.createClass({
  getInitialState: function () {
  return { users: [] };
},
// componentDidMount: function () {
//   this.chatProxy = this.props.chatProxy;
//   this.chatProxy.connect(this.props.username);
//   this.chatProxy.onMessage(this.addMessage.bind(this));
//   this.chatProxy.onUserConnected(this.userConnected.bind(this));
//   this.chatProxy.onUserDisconnected(this.userDisconnected.bind(this));
// },
//
// addMessage: function (message) {
//   if (message) {
//     message.date = new Date();
//     this.refs.messagesList.addMessage(message);
//   }
// },
// messageHandler: function (message) {
// message = this.refs.messageInput.getDOMNode().value;
// this.addMessage({
//   content: message,
//   author : this.chatProxy.getUsername()
// });
// this.chatProxy.broadcast(message);
// },


  render: function() {
    return (
      // <div className="chat-box" ref="root">
      //   <div className="chat-header ui-widget-header">React p2p Chat</div>
      //   <div className="chat-content-wrapper row">
      //     <MessagesList ref="messagesList"></MessagesList>
      //     <UsersList users={this.state.users} ref="usersList"></UsersList>
      //   </div>
      //   <MessageInput
      //     ref="messageInput"
      //     messageHandler={this.messageHandler}>
      //   </MessageInput>
      // </div>

      <div key="reports" className="reports-page">
  <div className="ng-scope">
    <Link to="/dashboard/overview" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Overview</Link>
    <h2>Reports <small>Work with Chart.js and D3</small></h2>

    <i className="glyphicon glyphicon-dashboard bg-fade"></i>
    <Jumbotron>
      <h1>Add Charts here</h1>
      <p>You can use C3.js or Chart.js</p>
      <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded">Learn more</a> </p>
    </Jumbotron>
  </div>
</div>

    );
  },


});

export default Buttons;
