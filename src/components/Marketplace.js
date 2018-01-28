import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import contract from 'truffle-contract';
import BookPub from '../contracts/BookPub';
import getWeb3 from '../utils/getWeb3';

let bookPub;

async function getBooks(instance, counter = 0, books = []) {
  const book = await instance.books(counter);
  if (book[1] === '0x') {
    return books;
  }
  return await getBooks(instance, counter + 1, [...books, book]);
}

class Marketplace extends Component {
  state = {};
  constructor(props) {
    super(props);
    getWeb3().then(web3 => {
      bookPub = contract(BookPub);
      bookPub.setProvider(web3.currentProvider);
      bookPub.deployed().then(async instance => {
        bookPub = instance;
        const books = await getBooks(instance);
        this.setState({ books });
      });
    });
  }
  render() {
    const { books } = this.state;
    return (
      <div>
        <h1>Books</h1>
        {books &&
          books.map(book => (
            <div style={{ marginTop: 100 }}>
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
              <p>
                <Link to={`/contribute/${book[1]}`}>Contribute</Link>
              </p>
            </div>
          ))}
      </div>
    );
  }
}

export default Marketplace;
