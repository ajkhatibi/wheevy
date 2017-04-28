import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Panel, Table} from 'react-bootstrap';
import $ from "axios";


var Blank = React.createClass({
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

  // handleClick: function(){
    // browserHistory.push('/dashboard/reports')
  // },

  render: function() {
    return (
      <Panel header={<span>Who's Nearby?</span>} bsStyle="primary" >
	<Table hover>
		<thead>
			<tr>
				<th>Username</th>
				<th>Gender</th>
				<th>Miles Away</th>
			</tr>
		</thead>
		<tbody>
        {
          this.state.activeUsers &&
          this.state.activeUsers.map((user, id) =>{
            return (
                <tr key={id}>
                  <td>{user.username}</td>
                  <td>{user.gender}</td>
                  <td>{user.location.coordinates}</td>
                </tr>
            );
          })
        }
		</tbody>
	</Table>
</Panel>


    );
  }

});

export default Blank;
