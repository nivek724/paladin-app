import React from "react";
import {Main, Left, Right} from './styles';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import WalletButton from "../walletButton/WalletButton";

interface Props {
    setWalletAddress: React.Dispatch<React.SetStateAction<string>>,
    walletAddress: string,
}

const Navbar : React.FC<Props> = (props) => {
    const {
        setWalletAddress,
        walletAddress,
    } = props;

    return (
        <Main>
            <Left>
                <AddBusinessIcon fontSize='large' style={{'marginRight': '.5rem'}}/>
                Paladin Test
            </Left>
            <Right>
                {
                    !walletAddress && <WalletButton setWalletAddress={setWalletAddress}/>
                }
                {
                    walletAddress && <div>{walletAddress} Hello</div>
                }
                
            </Right>
        </Main>
    )
}

export default Navbar;