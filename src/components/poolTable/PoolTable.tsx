import React, {useState} from 'react';
import {Box, MenuItem, Select, SelectChangeEvent, makeStyles} from '@mui/material';
import {CustomSvg} from './styles';
import uniToken from '../../images/UniToken.svg';

const PoolTable: React.FC = () => {
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
        justifyContent: 'space-between',
    }

    const selectStyle = {
        background: 'white',
        color: 'black', 
        
    }

    const [coinType, setCoinType] = useState('UNI');
    const [balance, setBalance] = useState(0.0);
    const [poolStats, setPoolStats] = useState(0);
    // const [coinType, setCoinType] = useState('UNI');
    // const [coinType, setCoinType] = useState('UNI');


    const handleCoinChange = (event: SelectChangeEvent) => {
        //update all display values
        setCoinType(event.target.value as string);
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
                            <CustomSvg src={uniToken}/>
                            UNI
                        </MenuItem>
                        <MenuItem value={'ETH'}>ETH</MenuItem>
                    </Select>
                    <div>0.0</div>
                </Box>
                Balance: {balance}
            </Box>
            <Box sx={smallStyle}>
                Testing
            </Box>
        </Box>

    );
}

export default PoolTable;