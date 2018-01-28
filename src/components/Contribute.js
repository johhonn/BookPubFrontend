import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import contract from 'truffle-contract';
import Book from '../contracts/Book';
import getWeb3 from '../utils/getWeb3';

class Contribute extends Component {
  state = {};
  constructor(props) {
    super(props);
    const { address } = props.match.params;
    console.log('PROPS: ', props);
    getWeb3().then(web3 => {
      const book = contract(Book);
      book.setProvider(web3.currentProvider);
      book.at(address).then(async instance => {
        const name = await instance.name();
        console.log('NAME ', name);
        this.setState({ name, bookInstance: instance, web3 });
      });
    });
  }

  handleChange = (fieldName, event) => {
    const state = {
      ...this.state,
    };
    state[fieldName] = event.target.value;
    this.setState(state);
  };

  send = () => {
    console.log('this.state.web3.coinbase: ', this.state.web3.eth.coinbase);
    this.state.bookInstance.buyCoin({
      from: this.state.web3.eth.coinbase,
      amount: this.state.amount || 100000,
    });
  };

  render() {
    const { name } = this.state;
    return (
      <div>
        <h1>Contribute</h1>
        <h2>{name}</h2>
        <div>
          <TextField
            hintText="Amount"
            onChange={this.handleChange.bind(this, 'amount')}
          />
          <br />
        </div>
        <button onClick={this.send}>Send</button>
      </div>
    );
  }
}

export default Contribute;
