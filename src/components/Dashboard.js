import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import contract from 'truffle-contract';
import BookPub from '../contracts/BookPub';
import getWeb3 from '../utils/getWeb3';

let bookPub;

class Dashboard extends Component {
  state = {};
  constructor(props) {
    super(props);
    getWeb3().then(web3 => {
      const network = Object.keys(BookPub.networks)[0];
      const address = BookPub.networks[network].address;
      bookPub = contract(BookPub);
      bookPub.setProvider(web3.currentProvider);
      bookPub.deployed().then(instance => {
        console.log('instance: ', instance);
        bookPub = instance;
        instance.getBook(0).then(book => {
          this.setState({ book });
          console.log('book: ', book);
        });
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
  modifyBook = () => {
    console.log(this.state);
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
                value="Funding Goal"
                onChange={this.handleChange.bind(this, 'goal')}
              />
              <input
                type="text"
                value="Users To Admit"
                onChange={this.handleChange.bind(this, 'usersToAdmit')}
              />
              <input
                type="text"
                value="Amount"
                onChange={this.handleChange.bind(this, 'amount')}
              />
              <input
                type="text"
                value="Sale Start"
                onChange={this.handleChange.bind(this, 'saleStart')}
              />
              <input
                type="text"
                value="Sale End"
                onChange={this.handleChange.bind(this, 'saleEnd')}
              />
              <Link to="/user">
                <button className="last-one" onClick={this.modifyBook}>
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
