import React from 'react';
import { Box, Button } from "@mui/material";
import { isFreeUser } from '../service/checkUserRole';
import { useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const LockCard = (props) => {

    let navigate = useNavigate();
    const {children} = props;
    return (
        <Box style={{width: '100%', height: '100%'}} sx={{position: 'relative'}}>
            {isFreeUser() && <Box display={'flex'} justifyContent='center' alignItems={'center'} style={{width: '100%', height: '100%'}} sx={{position: 'absolute', zIndex: 2}}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#3da58a', ':hover': {bgcolor:'green'}}}
                    onClick={() => {navigate("/home/premium")}}
                >
                    <LockOpenOutlinedIcon sx={{ mr: "10px" }} />
                    Unlock
                </Button>
            </Box>}
            <Box style={{width: '100%', height: '100%'}} sx={{opacity : isFreeUser() ? 0.3 : 1, position: 'absolute', zIndex: 1}}>
                {children}
            </Box>
        </Box>
    );
};

export default LockCard;