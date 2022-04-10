import React from "react";
import {Main, Left, Right} from './styles';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import WalletButton from "../walletButton/WalletButton";
import { ethers } from 'ethers';
import { Box } from '@mui/material';

interface Props {
    walletAddress: string,
    ethBal: ethers.BigNumberish | undefined,
    // contractAddress: string;
    // provider: ethers.providers.Web3Provider | undefined,
    // signer: ethers.providers.JsonRpcSigner | undefined,
    // contract: ethers.Contract | undefined,
    changeWallet: Function,
    changeEthers: Function,
    changeEth: Function,
}

const Navbar : React.FC<Props> = (props) => {
    const {
        walletAddress,
        ethBal,
        // contractAddress, 
        // provider,
        // signer,
        // contract,
        changeWallet,
        changeEth,
        changeEthers,
    } = props;

    
    

    return (
        <Main>
            <Left>
                <AddBusinessIcon fontSize='large' style={{'marginRight': '.5rem'}}/>
                Paladin Test
            </Left>
            <Right>
                {
                    !walletAddress && 
                    <WalletButton 
                        // walletAddress={walletAddress}
                        // contractAddress={contractAddress} 
                        // provider={provider} 
                        // signer={signer}
                        // contract={contract}
                        changeWallet={changeWallet}
                        changeEthers={changeEthers}
                        changeEth={changeEth}
                    />
                }
                {
                    walletAddress && (
                    <Box sx={{ 'display': 'flex', 'margin': '.5rem', 'justifyContent': 'space-around', 'border': '2px solid black', 'borderRadius': '5px'}}>
                        <Box sx={{'margin': '0 .5rem', 'padding': '.5rem'}}>{ethBal!==undefined ? ethers.utils.formatEther(ethBal).substring(0,6) : "error"} ETH</Box>
                        <Box sx={{'margin': '0 0 0 .5rem', 'padding': '.5rem', 'background':'black', 'color': 'white'}}>{walletAddress.substring(0,5)} ... {walletAddress.substring(walletAddress.length-3, walletAddress.length)}</Box>
                    </Box>
                    )
                }
                
            </Right>
        </Main>
    )
}

export default Navbar;