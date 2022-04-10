import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const CustomContainer = styled('div')`
    display: flex;
    height: 60%;
    justify-content: center;
    align-items: center;

`;

export const CustomTabs = styled(Tabs)`
     
    justifySelf: 'flex-start';

    .MuiTabs-indicator {
        display: none;
    }
`;

export const CustomTab = styled(Tab)`
    padding: 4px 16px;
    border-radius: 20px;
`;