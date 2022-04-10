import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import TabNav from './components/tabNav/TabNav';

import './App.css';

import { ethers, BigNumber } from 'ethers';
import IERC20 from './abi/IERC20.json';
import PalPool from './abi/PalPool.json';




function App() {
  
  const [walletAddress, setWalletAddress] = useState(''); 
  const [contractAddress, setContractAddress] = useState('0xB1265A6B2C5d43Ff358A847DF64fD825b7ed70e0'); //Uni Pool address
  const [ethBal, setEthBal] = React.useState<ethers.BigNumberish>();

  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>();
	const [signer, setSigner] = React.useState<ethers.providers.JsonRpcSigner>();
	const [contract, setContract] = React.useState<ethers.Contract>();

  const changeEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, PalPool, tempSigner);
    setContract(tempContract);
  }

  const changeWallet = (address:string) => {
    setWalletAddress(address);
  }

  const changeEth = async (address: string) => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let balance = await tempProvider.getBalance(address);
    setEthBal(balance);
  }


  return (
    <div className="App">
      <Navbar 
        walletAddress={walletAddress} 
        ethBal={ethBal} 
        contractAddress={contractAddress} 
        provider={provider} 
        signer={signer}
        contract={contract}
        changeWallet={changeWallet}
        changeEthers={changeEthers}
        changeEth={changeEth}
      />
      <TabNav walletAddress={walletAddress}/>
    </div>
  );
}

export default App;
