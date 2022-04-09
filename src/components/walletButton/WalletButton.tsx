import React from 'react';
import { ethers } from 'ethers';
import { CustomButton } from './styles';


interface Props {
    setWalletAddress: React.Dispatch<React.SetStateAction<string>>
}

const WalletButton : React.FC<Props> = (props) => {

    const {
        setWalletAddress,
    } = props;

    const handleAccountUpdate = (address:string) => {
        setWalletAddress(address);
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
        }

    };

    return(
        <CustomButton variant='contained' onClick={handleWalletButton} disabled>
            Connect Wallet
        </CustomButton>
    );
};

export default WalletButton