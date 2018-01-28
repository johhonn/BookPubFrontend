import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

class User extends Component {
  render() {
      return (
        <div className="user">
            <div className="user-top">
                <p>Crowdfunding Goal: XXX</p>
                <p>Coins To Be Minted: XXX</p>
                <p>Sale End Date: DD-MM-YYYY</p>
            </div>
            <div className="user-input-box">
                <h2>User Invitation Request</h2>
                <div className="user-input">
                    <input className="input1" type="text" placeholder="Enter email" />
                    <input className="input2" type="text" placeholder="ETH" />
                    <button>Submit Request</button>
                </div>
                <div className="user-input-res">
                    <Table>
                      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Invite ETA</TableHeaderColumn>
                            <TableHeaderColumn>Equity Share Estimate</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>XX</TableRowColumn>
                                <TableRowColumn>XX</TableRowColumn>
                            </TableRow>
                      </TableBody>
                    </Table>
                </div>
            </div>
            <div className="queue">
                <h2>Current Queue</h2>
                <div className="queue-table">
                    <Table>
                      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>#</TableHeaderColumn>
                            <TableHeaderColumn>Address</TableHeaderColumn>
                            <TableHeaderColumn>Date Requested</TableHeaderColumn>
                            <TableHeaderColumn>Amount Paid</TableHeaderColumn>
                            <TableHeaderColumn>Invite ETA</TableHeaderColumn>
                            <TableHeaderColumn>Equity Share Estimate</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn>XX</TableRowColumn>
                                <TableRowColumn>XXX</TableRowColumn>
                                <TableRowColumn>XX</TableRowColumn>
                                <TableRowColumn>XX</TableRowColumn>
                                <TableRowColumn>XX</TableRowColumn>
                            </TableRow>
                      </TableBody>
                    </Table>
                </div>
            </div>
        </div>
      )
  }
}

export default User;