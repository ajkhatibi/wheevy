import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Panel, Table} from 'react-bootstrap';

var Blank = React.createClass({
  searchUsers: function(){
    $({
      method: 'get',
      url: '/searchUsers'
    }).then((response) => {
      console.log(response);
    })
  },

  render: function() {
    return (
      <Panel header={<span>Who's Nearby?</span>} bsStyle="success" >
	<Table hover>
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Address</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>John</td>
				<td>john@gmail.com</td>
				<td>London, UK</td>
			</tr>

		</tbody>
	</Table>
</Panel>


    );
  }

});

export default Blank;
