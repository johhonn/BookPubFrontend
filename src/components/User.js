import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import contract from 'truffle-contract';
  import Book from '../contracts/Book';
  import getWeb3 from '../utils/getWeb3';

  let bookInstance;
  let book;
  let web3;
  let address='0xecd6e37c1c40c788d5f2c066505855d651dac21d';

  getWeb3().then(web3Instance => {
    web3 = web3Instance;
    const network = Object.keys(Book.networks)[0];
    book = contract(Book);
    console.log('web3: ', web3.currentProvider);
    book.setProvider(web3.currentProvider);
    book.at(address).then(async instance => {
      bookInstance=instance;
      const name = await instance.name();
      console.log('NAME ', name);

    });
  });

class User extends Component {
    state = {};
    handleChange = (fieldName, event) => {
      const state = {
        ...this.state,
      };
      state[fieldName] = event.target.value;
      this.setState(state);
    };

    send = () => {
      console.log('this.state.web3.coinbase: ', web3.eth.coinbase);
      bookInstance.buyCoin({
        from: web3.eth.coinbase,
        amount: this.state.amount || 100000,
      });
    };






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
                    <input className="input1" type="text" placeholder="Enter email" onChange={this.handleChange.bind(this, 'email')}/>
                    <input className="input2" type="text" placeholder="ETH" />
                    <button onClick={this.send}>Submit Request</button>
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
