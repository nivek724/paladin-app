import React, {useState} from 'react';
import {Box, MenuItem, Select, SelectChangeEvent, TextField, Button} from '@mui/material';
import {CustomImg, WalletButtonTwo, Cp} from './styles';
import uniToken from '../../images/UniToken.svg';
import { ethers } from 'ethers';
import PoolButton from '../poolButton/PoolButton';


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
    approve: Function,
    buttonText: string,
    tokenBal: string,
    checkTokenBal: Function,
    setDeposit: Function,
    poolStats: any,
}

const PoolTable: React.FC<Props> = (props) => {
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
        approve,
        buttonText,
        tokenBal,
        checkTokenBal,
        setDeposit,
        poolStats,
    } = props;

    const bigStyle = {
        background: 'black',
        color: 'white',
        padding: '1rem',
        borderRadius: '10px',
        minWidth: '496px',
        minHeight: '483px',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
    }

    const smallStyle = {
        background: '#302720',
        borderRadius: '10px',
        margin: '1rem .25rem',
        padding: '1rem'
    }

    const flexStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    }

    const selectStyle = {
        background: 'white',
        color: 'black', 
        
    }

    const [coinType, setCoinType] = useState('UNI');
    


    const handleCoinChange = (event: SelectChangeEvent) => {
        //update all display values
        setCoinType(event.target.value as string);
        checkTokenBal(event.target.value as string);
    }

    const handleInput = (event: any) => {
        let deposit = event.target.value;
        setDeposit(deposit);
    }


    return (
        <Box sx={bigStyle}>
            Pal{coinType} Pool
            <Box sx={smallStyle}>
                <Box sx={flexStyle}>
                    <Select 
                        labelId='Currency Selection label'
                        id='Currency Selection'
                        value={coinType}
                        onChange={handleCoinChange}
                        sx={selectStyle}
                    >
                        <MenuItem value={'UNI'}>
                            <CustomImg src={uniToken}/>
                            UNI
                        </MenuItem>
                        <MenuItem value={'PALUNI'}>PalUNI</MenuItem>
                    </Select>
                    <Button sx={{'color': '#F56736', 'background': '#F567364D', 'margin': '0 1rem'}}>Max</Button>
                    <div style={{'flexBasis': '60%'}}/>
                    <TextField id='deposit-box' label="num" placeholder='0.0' size="small" sx={{'width': '20%', 'background': '#F567364D'}} onChange={handleInput} disabled={buttonText==='Deposit'}></TextField>
                </Box>
                Balance: {`${tokenBal} ${coinType}`}
            </Box>
            <Box sx={smallStyle}>
                <Box sx={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', 'margin': '0 .5rem'}}>
                    <Cp style={{fontWeight: 900, textDecoration: 'underline'}}>Pool Stats</Cp>
                </Box>
                <Box sx={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', 'margin': '0 .5rem'}}>
                    <Cp>Total Supply</Cp>
                    <Cp>{`${poolStats.userSupply} ${coinType} / $${poolStats.totalSupply}`}</Cp>
                </Box>
                <Box sx={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', 'margin': '0 .5rem'}}>
                    <Cp>Total Borrowed</Cp>
                    <Cp>{`${poolStats.userBorrowed} ${coinType} / $${poolStats.totalBorrowed}`}</Cp>
                </Box>
                <Box sx={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', 'margin': '0 .5rem'}}>
                    <Cp>Active Loans</Cp>
                    <Cp>{`${poolStats.activeLoans}`}</Cp>
                </Box>
                <Box sx={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', 'margin': '0 .5rem'}}>
                    <Cp>Minimum Borrow Period</Cp>
                    <Cp>{'7 days'}</Cp>
                </Box>
            </Box>

            { !walletAddress && 
                <WalletButtonTwo 
                // walletAddress={walletAddress}
                // contractAddress={contractAddress} 
                // provider={provider} 
                // signer={signer}
                // contract={contract}
                changeWallet={changeWallet}
                changeEthers={changeEthers}
                changeEth={changeEth}
                styles={{'background': '#80381F',}}
                >
                    Connect To a Wallet 
                </WalletButtonTwo>
            }
            {   walletAddress && 
                <PoolButton text={buttonText} callback={approve} styles={{}} />

            }
        </Box>

    );
}

export default PoolTable;