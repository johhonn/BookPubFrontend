import Web3 from 'web3';
export default function() {
  return new Promise((f, r) => {
    window.addEventListener('load', () => {
      // Use mist / metamask if it's available
      console.log('WEB3!', window.web3);
      if (typeof window.web3 !== 'undefined' && window.web3.currentProvider) {
        f(new Web3(window.web3.currentProvider));
      } else {
        const web3 = new Web3();
        web3.setProvider(
          new web3.providers.HttpProvider('http://localhost:8545'),
        );
        f(web3);
      }
    });
  });
}
