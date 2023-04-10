import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

function App() {
  // Initialize Web3 provider
  let web3Provider;

  // Connect button
  const connectButton = document.getElementById('connectButton');

  // Ethereum address of the logged-in user
  let userAddress = '';

  // Check if the user is already logged in
  if (localStorage.getItem('userAddress')) {
    userAddress = localStorage.getItem('userAddress');
    // Show the logout button
    logoutButton.style.display = 'inline';
  } else {
    // Show the connect button
    connectButton.style.display = 'inline';
  }

  // Handle connect button click
  connectButton.onclick = async () => {
    try {
      // Create a WalletConnect provider
      web3Provider = new WalletConnectProvider({
        rpc: {
          1: 'https://mainnet.infura.io/v3/3431d396db43496dbc9a92c0ad658db0<3431d396db43496dbc9a92c0ad658db0>',
          
        }
      });

      // Connect to the provider
      await web3Provider.enable();

      // Initialize Web3
      const web3 = new Web3(web3Provider);

      // Get the user's Ethereum address
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];

      // Store the user's Ethereum address in local storage
      localStorage.setItem('userAddress', userAddress);

      // Hide the connect button and show the logout button
      connectButton.style.display = 'none';
      logoutButton.style.display = 'inline';
    } catch (error) {
      console.error(error);
      alert('Connection failed');
    }
  };

  // Handle logout button click
  logoutButton.onclick = () => {
    // Clear the user's Ethereum address from local storage
    userAddress = '';
    localStorage.removeItem('userAddress');

    // Close the WalletConnect provider
    if (web3Provider) {
      web3Provider.close();
      web3Provider = null;
    }

    // Hide the logout button and show the connect button
    logoutButton.style.display = 'none';
    connectButton.style.display = 'inline';
  };

  return (
    <div>
      <button id="connectButton" style={{ display: 'none' }}>Connect with WalletConnect</button>
      <button id="logoutButton" style={{ display: 'none' }}>Logout</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
