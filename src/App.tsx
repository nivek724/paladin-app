import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import TabNav from './components/tabNav/tabNav';

import './App.css';

import { BigNumber, ethers } from 'ethers';
import ERC20 from './abi/ERC20.json';
import PalPool from './abi/PalPool.json';

import { createTheme, ThemeProvider } from '@mui/material';

const tokenAddress = {
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  PALUNI: '0x961692fb4Ca983A116a6432E2b82972094c71cf2',
}

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFF',
        light: '#FFF',
        dark: '#FFF',
        contrastText: '#FFF',
      },
      secondary: {
        main: '#FFF',
        light: '#FFF',
        dark: '#FFF',
        contrastText: '#FFF',
      },
    },
  })
  
  const [walletAddress, setWalletAddress] = useState(''); 
  const [contractAddress, setContractAddress] = useState('0xB1265A6B2C5d43Ff358A847DF64fD825b7ed70e0'); //Uni Pool address
  const [secondContractAddress, setSecondContractAddress] = useState('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984') //ERC20 starts with UNI
  const [ethBal, setEthBal] = React.useState<ethers.BigNumberish>();

  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>();
	const [signer, setSigner] = React.useState<ethers.providers.JsonRpcSigner>();
	const [contract, setContract] = React.useState<ethers.Contract>(); //ERC20
  const [contractPool, setContractPool] = React.useState<ethers.Contract>(); //POOL 

  interface PoolStats {
    totalSupply: string
    userSupply: string
    totalBorrowed: string
    userBorrowed: string
    activeLoans: string
  }

  const [poolStats, setPoolStats] = React.useState<PoolStats>({totalSupply: '0', userSupply: '0', totalBorrowed: '0', userBorrowed: '0', activeLoans: '0'});

  const [tokenBal, setTokenBal] = useState('0.0');

  const [buttonText, setButtonText] = useState('Approve');// Approve || Deposit
  const [deposit, setDeposit] = useState('0');

  type tokenAddressIndex = 'UNI' | 'PALUNI' // | 'other coin'

  const checkTokenBal = async(token: tokenAddressIndex) => {
    if(signer) {
        //have correct contract with address to token defaults to uni
      let tempAddress = tokenAddress[token];
      let tempContract = contract;
      if(secondContractAddress !== tempAddress || tempContract === undefined) {
        setSecondContractAddress(tempAddress);
        tempContract = new ethers.Contract(tempAddress, ERC20, signer); //change contract 
        setContract(tempContract);
      }
      //tempContract should be correct token address based on token
      let bal = await tempContract.balanceOf(walletAddress);
      setTokenBal(ethers.utils.formatEther(bal.toString()));
    } else {
      console.log("error with balance");
    }
    
  }
  
  const callbackFunc = () => {
    if(buttonText === 'Approve') {
      approvalFunc(parseFloat(deposit));
    } else {
      depositFunc();
    }
    toggleButtonText();
  }

  const toggleButtonText = () => {
    if(buttonText === 'Approve') {
      setButtonText('Deposit');
    } else {
      setButtonText('Approve');
    }
  }

  const changeEthers = async (address: string) => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, PalPool, tempSigner);
    setContractPool(tempContract);

    let tempContract2 = new ethers.Contract(secondContractAddress, ERC20, tempSigner);
    setContract(tempContract2);

    let bal = await tempContract2.balanceOf(address);
    setTokenBal(ethers.utils.formatEther(bal.toString()));

    getPoolStats(address,tempContract);
  }

  const changeWallet = (address:string) => {
    setWalletAddress(address);
  }

  const changeEth = async (address: string) => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let balance = await tempProvider.getBalance(address);
    setEthBal(balance);
  }

  const approvalFunc = (tokensToDeposit: number) => {
    console.log(tokensToDeposit);
  }

  const depositFunc = async () => {
    //contractpool
    if(contract){
      try{
        console.log(ethers.utils.formatUnits(deposit,18))
        let paltoken = await contract.transferFrom(walletAddress, contractAddress, ethers.utils.parseUnits(deposit,18));// not sure what to do with paltoken returned
        console.log(paltoken);
      }
      catch(e) {
        console.log(e);
      }
    }
    setDeposit('0');
    getPoolStats(walletAddress,contractPool as ethers.Contract);
    checkTokenBal('UNI'); //change to have state var here instead of at lower level
  }

  const getPoolStats = async (address:string, contract: ethers.Contract) => {
    let pool = {totalSupply: '0', userSupply: '0', totalBorrowed: '0', userBorrowed: '0', activeLoans: '0'};
    pool.userBorrowed = (await contract.underlyingBalanceOf(address)).toString();
    pool.totalBorrowed = (await contract.totalBorrowed()).toString();
    pool.userSupply = (await contract.balanceOf(address)).toString();
    pool.totalSupply = (await contract.totalReserve()).toString();
    // let activeLoans = await contract.getLoansPools();  //Checks for all loans in pool
    let activeLoans = await contract.getLoansByBorrower(address); //checks for all loans by borrower
    pool.activeLoans = activeLoans.filter(async (loan:any) =>{
            let loanInfo = await contract.getBorrowData(loan);
            return !loanInfo._closed
          }).length
    console.log(pool); //Testing
    setPoolStats(pool);
  }


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar 
          walletAddress={walletAddress} 
          ethBal={ethBal} 
          // contractAddress={contractAddress} 
          // provider={provider} 
          // signer={signer}
          // contract={contract}
          changeWallet={changeWallet}
          changeEthers={changeEthers}
          changeEth={changeEth}
        />
        <TabNav 
          walletAddress={walletAddress} 
          ethBal={ethBal} 
          // contractAddress={contractAddress} 
          // provider={provider} 
          // signer={signer}
          // contract={contract}
          changeWallet={changeWallet}
          changeEthers={changeEthers}
          changeEth={changeEth}
          callback={callbackFunc}
          buttonText={buttonText}
          toggleButtonText={toggleButtonText}
          tokenBal={tokenBal}
          checkTokenBal={checkTokenBal}
          setDeposit={setDeposit}
          poolStats={poolStats}
        />
      </div>
    </ThemeProvider>
    
  );
}

export default App;
