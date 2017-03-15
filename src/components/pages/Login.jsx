import React from 'react';
import Router, {Link, browserHistory} from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import {History} from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "axios";

var LoginPage = React.createClass({

  getInitialState: function(){
    return {
      loginID: '',
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
              <h1>Wheevy <small>by Khatibi Estates</small></h1>
              <form role="form" onSubmit={this.handleLogin} className="ng-pristine ng-valid">
                <div className="form-content">
                  <div className="form-group">
                    <input type="text" value={this.state.value} name='loginID' onChange={this.setLoginID} className="form-control input-underline input-lg" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input type="password" value={this.state.value} name='password' onChange={this.setLoginPassword} className="form-control input-underline input-lg" placeholder="Password" />
                  </div>
                </div>
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Login</button>
                <Link type="register" to='/register' className="btn btn-white btn-outline btn-lg btn-rounded">Registerrr</Link>
              </form>
            </div>
          </div>
        </div>

    );


  },

  setLoginID: function(e) {
    this.setState({
      loginID: e.target.value,
    });
  },

  setLoginPassword: function(e) {
    this.setState({
      password: e.target.value,
    });
  },

  handleLogin: function(e){
    e.preventDefault();
    // this.props.history.pushState(null, '/dashboard/overview');
    $.post('/users/login', {
      username: this.state.loginID,
      password: this.state.password
    }).then(function(user){
      console.log('user: ', user);
      browserHistory.push('/homepage');
    }).catch(function(error){
      console.log(error);
      console.log('there seems to be an error with the login', error)
    });

    // this.transitionTo('dashboard');
    return false;
  }
});

export default LoginPage;
