import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getWeb3 from '../utils/getWeb3';
import contract from 'truffle-contract';
import BookPub from '../contracts/BookPub';
let address='0xecd6e37c1c40c788d5f2c066505855d651dac21d';
let bookPub;
let web3;
getWeb3().then(web3Instance => {
  web3 = web3Instance;
  const network = Object.keys(BookPub.networks)[0];
  bookPub = contract(BookPub);
  console.log('web3: ', web3.currentProvider);
  bookPub.setProvider(web3.currentProvider);
  bookPub.at(address).then(async instance => {
    bookPub=instance;
    console.log(bookPub);

  });
});
class CoinSetup extends Component {
  state = {
    readershipStake: 100,
  };

  handleChange = (fieldName, event) => {
    const state = {
      ...this.state,
    };
    state[fieldName] = event.target.value;
    this.setState(state);
  };

  handleReadershipStake = (event, value) => {
    this.setState({ readershipStake: value });
  };

  create = () => {
    const {
      readershipStake,
      goal,
      toBeShipped,
      userCount,
      eligibleCount,
      initialAmount,
      coinName,
      symbol,
      decimalUnits,
      startdate,
      enddate,
      amount,
    } = this.state;
    console.log(
      readershipStake,
      goal,
      toBeShipped,
      userCount,
      eligibleCount,
      initialAmount,
      coinName,
      decimalUnits,
      symbol,
      startdate,
      enddate,
      amount,
      { from: web3.eth.accounts[0] },
    );
    bookPub.createBookStruct(readershipStake, coinName, symbol, 'something', {
      from: web3.eth.accounts[0],
    });
  };

  render() {
    return (
      <div className="coin-setup">
        <h2>Coin Setup</h2>
        <div>
          <div className="input-text">
            <TextField
              hintText="Book Name"
              onChange={this.handleChange.bind(this, 'name')}
            />
            <br />
          </div>
          <div className="public-equity">
            <p>
              <span>{'Public Equity Reserve '}</span>
              <span className="equity-percentage">
                {this.state.secondSlider}
                {' %'}
              </span>
            </p>
            <Slider
              min={0}
              max={100}
              step={1}
              value={this.state.readershipStake}
              onChange={this.handleReadershipStake}
            />
          </div>
          <div className="gov">
            <p>Governance</p>
            <SelectField value={this.state.value}>
              <MenuItem
                value={'Boardroom Integration'}
                primaryText="Board Room Integration"
              />
              <MenuItem
                value={'Traditional Equity Based'}
                primaryText="Traditional Equity Based"
              />
            </SelectField>
            <br />
          </div>
          <div>
            <TextField
              hintText="Coin Name (i.e. Ether)"
              onChange={this.handleChange.bind(this, 'coinName')}
            />
            <br />
          </div>
          <div>
            <TextField
              hintText="Coin Acronym (i.e. ETH)"
              onChange={this.handleChange.bind(this, 'symbol')}
            />
            <br />
          </div>
        </div>
        <Link to="/dashboard">
          <button onClick={this.create}>Create</button>
        </Link>
      </div>
    );
  }
}

export default CoinSetup;
