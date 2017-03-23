// import React from 'react';
// import Router, {Link, browserHistory} from 'react-router';
// import {Panel, Input, Button} from 'react-bootstrap';
// import {History} from 'history';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import image from '../../common/images/flat-avatar.png';
//
// var Locator = React.createClass({
//   getInitialState: function(){
//     return {
//       location: null
//     };
//   },
//     mixins: [History],
//   render: function(){
//     return(
//       <div className='container'>
//         <div className="row">
//          <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
//             <img src={image} className="user-avatar" alt="profile" />
//             <h1>Ani Theme </h1>
//             <div>
//                <h1>Attention!</h1>
//                <p>This app will intentionally track your location at anytime. Please feel free to turn off this setting whenever you please</p>
//                <button onClick={handleClick} type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Track My Location</button>
//             </div>
//          </div>
//        </div>
//       </div>
//     )
//   },
//   handleClick: function(e){
//     e.preventDefault();
//     console.log('hangling click from location page to login page');
//     browserHistory.push('/dashboard');
//     let watchID = navigator.geolocation.watchPosition(function(position) {
//       do_something(position.coords.latitude, position.coords.longitude);
//     });
//     console.log(watchID);
//
//   }
//
// });
// export default Locator;
