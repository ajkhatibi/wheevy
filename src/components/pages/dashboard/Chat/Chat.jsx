import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom'
import './Chat.less';
import $ from "axios";


var Buttons = React.createClass({

  getInitialState: function() {
    return {
      activeUsers: []
    };
  },

  componentDidMount: function() {
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

  userClick: function(){
    console.log('hi')
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
          return(
            <li  key={id}>
              <div className="info">
                <div className="user">{user.username}</div>
                <div className="status on"> online</div>
              </div>
            </li>
          )
        })
      }
    </menu>
  </div>
  <div className="chat">
    <div className="top">
      <div className="avatar">
        <img width={50} height={50} src="http://cs625730.vk.me/v625730358/1126a/qEjM1AnybRA.jpg" />
      </div>
      <div className="info">
        <div className="name">Юния Гапонович</div>
        <div className="count">already 1 902 messages</div>
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
      <textarea placeholder="Type your message" name="e" id="texxt" rows={2} defaultValue={""} />
      <i className="fa fa-picture-o" />
      <i className="fa fa-file-o" />
      <span className="send">Send</span>
    </div>
  </div>
</div>

    );
  },


});


export default Buttons;
