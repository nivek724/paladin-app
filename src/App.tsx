import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';

import './App.css';

import { ethers } from 'ethers';



function App() {
  
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <div className="App">
      <Navbar setWalletAddress={setWalletAddress} walletAddress={walletAddress}/>
    </div>
  );
}

export default App;
