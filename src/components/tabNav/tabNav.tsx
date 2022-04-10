import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {CustomContainer, CustomTab, CustomTabs} from './styles';
import { Delete } from '@mui/icons-material';

import PoolTable from '../poolTable/PoolTable';
import DashTable from '../dashTable/DashTable';

interface TabNavHeadProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabNavHead(props: TabNavHeadProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabNavProps {
    walletAddress: string,
}

export default function TabNav(props: TabNavProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <CustomContainer>
        <Box sx={{ marginTop: '100px' }}>
        <Box sx={{ border: '4px solid black', borderRadius: 4, padding: '.5rem 1rem', maxWidth: 'fit-content'}}>
            <CustomTabs value={value} onChange={handleChange} aria-label="tabs" >
                <CustomTab label="Pool" {...a11yProps(0)} sx={{ color: value!==0 ? 'black !important' : 'white !important', background: value===0 ? 'black !important' : 'none' }}/>
                <CustomTab label="Dashboard" {...a11yProps(1)} sx={{ color: value!==1 ? 'black !important' : 'white !important', background: value===1 ? 'black !important' : 'none'}}/>
            </CustomTabs>
        </Box>
        <TabNavHead value={value} index={0}>
            Pool
            <PoolTable/>
        </TabNavHead>
        <TabNavHead value={value} index={1}>
            Dashboard
            <DashTable/>
        </TabNavHead>
        </Box>
    </CustomContainer>
  );
}
