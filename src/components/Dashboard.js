import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import contract from 'truffle-contract';
import BookPub from '../contracts/BookPub';
import getWeb3 from '../utils/getWeb3';

let bookPub;
let web3;
getWeb3().then(web3Instance => {
  web3 = web3Instance;
  const network = Object.keys(BookPub.networks)[0];
  bookPub = contract(BookPub);
  console.log('web3: ', web3.currentProvider);
  bookPub.setProvider(web3.currentProvider);
  bookPub.deployed().then(instance => {
    console.log(instance);
    bookPub = instance;
  });
});
class Dashboard extends Component {
  state = {};
  constructor(props) {
    super(props);
   console.log(bookPub)
  }

  addPartner(){


  }
  handleChange = (fieldName, event) => {
    const state = {
      ...this.state,
    };
    state[fieldName] = event.target.value;
    this.setState(state);
    console.log(this.state);
  };
  modifyBook = () => {


    console.log( web3.eth.accounts[0])

    bookPub.modifyBookStruct(1,this.state.goal,this.state.startdate,this.state.enddate,this.state.usersToAdmit  ,{from: web3.eth.accounts[0],})




  };
  showAddParter= () => {

  };
  render() {
    const { book } = this.state;
    return (
      <div>
        {book && (
          <div style={{ marginTop: 100 }}>
            <h3>First book</h3>
            <p>
              <span>ID: </span>
              {book[0].toString()}
            </p>
            <p>
              <span>Published address: </span>
              {book[1]}
            </p>
            <p>
              <span>Owner: </span>
              {book[2]}
            </p>
            <p>
              <span>Readership stake: </span>
              {book[3].toString()}
            </p>
          </div>
        )}
        <div className="top-bar">
          <p>Current Market Price XXX = $X | 7d avg inflation = -5%</p>
        </div>
        <div className="public-coin">
          <h2>Public Coin Dashboard</h2>
          <div className="box-1">
            <div className="details">
              <div>
                <span className="the-name">Current Goal</span>
                <span className="the-value">(none)</span>
              </div>
              <div>
                <span className="the-name">Funds Raised</span>
                <span className="the-value">(none)</span>
              </div>
              <div>
                <span className="the-name">Public Coins</span>
                <span className="the-value">150</span>
              </div>
              <div>
                <span className="the-name">Operating Capital</span>
                <span className="the-value">150</span>
              </div>
            </div>
            <div className="in-buttons">
              <input
                type="text"
                className="input3"
                placeholder="Funding Goal"
                onChange={this.handleChange.bind(this, 'goal')}
              />
              <input
                type="text"
                className="input3"
                placeholder="Users To Admit"
                onChange={this.handleChange.bind(this, 'usersToAdmit')}
              />
              <input
                type="text"
                className="input3"
                placeholder="Amount"
                onChange={this.handleChange.bind(this, 'amount')}
              />
              <input
                type="text"
                className="input3"
                placeholder="Sale Start"
                onChange={this.handleChange.bind(this, 'startdate')}
              />
              <input
                type="text"
                className="input3"
                placeholder="Sale End"
                onChange={this.handleChange.bind(this, 'enddate')}
              />
              <Link to="/user">
                <button className="user-input2" onClick={this.modifyBook}>
                  Start Funding Round
                </button>

              </Link>
            </div>
          </div>
          <div className="out-buttons">
            <Link to="/user">
              <button>View Queue</button>
            </Link>
            <button>Configure Regulations</button>
            <button>Buy Back Coins</button>
            <button className="user-input2" onClick={this.modifyBook}>
              OtherStuff
            </button>
          </div>
        </div>
        <div className="equity-ratios">
          <h2>Equity Ratios</h2>
          <div className="box-2">
            <div className="equity-details">
              <div>
                <span className="the-name">Founder</span>
                <span className="the-value">20%</span>
              </div>
              <div>
                <span className="the-name">Co-Founder</span>
                <span className="the-value">20%</span>
              </div>
              <div>
                <span className="the-name">Public Coins</span>
                <span className="the-value">15%</span>
              </div>
              <div>
                <span className="the-name">To Be Allocated</span>
                <span className="the-value">45%</span>
              </div>
            </div>
            <div className="in-button">
              <button>Add a Partner</button>
              <button>Send Dividend</button>
              <button>Allocate Coins</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
