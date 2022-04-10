import React from 'react';
import { ethers } from 'ethers';
import { CustomButton } from './styles';



interface Props {
    // walletAddress: string,
    // contractAddress: string;
    // provider: ethers.providers.Web3Provider | undefined,
    // signer: ethers.providers.JsonRpcSigner | undefined,
    // contract: ethers.Contract | undefined,
    changeWallet: Function,
    changeEthers: Function,
    changeEth: Function,
    styles?: any,
}

const WalletButton : React.FC<Props> = (props) => {

    const {
        // walletAddress,
        // contractAddress, 
        // provider,
        // signer,
        // contract,
        changeWallet,
        changeEthers,
        changeEth,
        styles,
    } = props;

    const handleAccountUpdate = (address:string) => {
        changeWallet(address);
        changeEthers(address);
        changeEth(address);
    }

    const handleWalletButton = () => {
        if(window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts'})
            .then((result : Array<string>) => {
                handleAccountUpdate(result[0]);
            })
            .catch((error: {message: string} ) => {
                console.log(error.message);
            })
        } else {
            console.log('Need metamask');
        }

    };

    return(
        <CustomButton variant='contained' onClick={handleWalletButton} sx={styles}>
            Connect Wallet
        </CustomButton>
    );
};

export default WalletButton