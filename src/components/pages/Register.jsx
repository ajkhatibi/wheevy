import React from 'react';
import Router, {Link, browserHistory} from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import { History } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "axios";

var Register = React.createClass({

  getInitialState: function(){
    return {
      username: '',
      email: '',
      password: '',
      isSubmitted: false
    };
  },

  mixins: [History],

  render: function(){
    return(
        <div className="login-page ng-scope ui-view">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
              <img src={require("../../common/images/flat-avatar.png")} className="user-avatar" />
              <h1>Wheevy <small>Register</small></h1>
              <form role="form" onSubmit={this.handleRegister}  className="ng-pristine ng-valid">
                <div className="form-content">
                  <div className="form-group">
                    <input type="text" value={this.state.value} name='name' onChange={this.setUsername} className="form-control input-underline input-lg" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <input type="text" value={this.state.value} name='email' onChange={this.setEmail} className="form-control input-underline input-lg" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input type="password" value={this.state.value} name='password' onChange={this.setPassword} className="form-control input-underline input-lg" placeholder="Password" />
                  </div>
                </div>
                 <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Register Now</button>
              </form>
            </div>
          </div>
        </div>

    );


  },

  setEmail: function(e) {
    this.setState({
      email: e.target.value,
    });
  },
  setUsername: function(e) {
    this.setState({
      username: e.target.value,
    });
  },
  setPassword: function(e) {
    this.setState({
      password: e.target.value,
    });
  },

  handleRegister: function(e){
    e.preventDefault();
    console.log(this.state)
    $.post('/users/register', {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    }).then(function(data){
      console.log('this is working passport', data);
      browserHistory.push('/');
    }).catch(function(err){
      console.log(err)
    });
  }

});

export default Register;
