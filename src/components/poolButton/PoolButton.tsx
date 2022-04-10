import React from 'react';
import { CustomButton } from './styles';



interface Props {
    // walletAddress: string,
    // contractAddress: string;
    // provider: ethers.providers.Web3Provider | undefined,
    // signer: ethers.providers.JsonRpcSigner | undefined,
    // contract: ethers.Contract | undefined,
    // changeWallet: Function,
    // changeEthers: Function,
    // changeEth: Function,
    text: string,
    callback: Function,
    styles?: any,
}

const PoolButton : React.FC<Props> = (props) => {

    const {
        // walletAddress,
        // contractAddress, 
        // provider,
        // signer,
        // contract,
        // changeWallet,
        // changeEthers,
        // changeEth,
        text,
        callback,
        styles,
    } = props;

    
    const handleWalletButton = () => {
        callback();
    };

    return(
        <CustomButton variant='contained' onClick={handleWalletButton} sx={styles}>
            {text}
        </CustomButton>
    );
};

export default PoolButton;