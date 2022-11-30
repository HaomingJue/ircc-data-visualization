import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { tokens } from '../common/theme';
import { getLocal, updateLocal } from '../service/localStorage';
import dateFormat from 'dateformat';
import { handleRequest, HttpRequest } from '../model/http_request';

export default function PremiumCard(props) {
    let plan = props.plan
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleClick = () => {
        let user = getLocal('user');
        var expireDate;
        var newExpireDate;
        var userExpireDate = dateFormat(user?.expireDate, 'yyyy-mm-dd')
        var today = dateFormat(new Date(), 'yyyy-mm-dd')
        if(user.role) {
            alert("Admin do not need to subscribe")
            return;
        }
        else if (userExpireDate > today) {
            expireDate = new Date(userExpireDate);
            expireDate.setMonth(expireDate.getMonth() + plan.month);
            newExpireDate = dateFormat(expireDate, 'yyyy-mm-dd')
        }
        else {
            expireDate = new Date(today)
            expireDate.setMonth(expireDate.getMonth() + Number(plan.month));
            newExpireDate = dateFormat(expireDate, 'yyyy-mm-dd')
        }
        let subscribeRequest = {};
        subscribeRequest["plan_id"]=user.planId;
        subscribeRequest["expire_date"]=newExpireDate
        console.log('/subscription/update/'+user.subId)
        let request = new HttpRequest('Put', `/subscription/update/${user.subId}`, subscribeRequest);
        handleRequest(request).then(alert("Subscribe successfully")).catch((err) => alert(err));
        updateLocal();
        user = getLocal('user');
        console.log(user.expireDate);
    }
      
    

    return (
        <Box backgroundColor= {colors.primary[400]}>
            <Card sx={{backgroundColor: colors.primary[400] , "& :hover": {backgroundColor: colors.primary[400]}}}>
                <CardActionArea >
                    <CardMedia
                    component="img"
                    height={"375px"}
                    image={plan.image}
                    alt="not found"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color={colors.redAccent[500]}  sx={{  fontWeight: 'bold',}}>
                        {plan.plan_name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" color={colors.blueAccent[400]} sx={{  fontWeight: 'bold',}}>
                        {plan.plan_price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {plan.plan_description}
                    </Typography>
                    </CardContent>
                    <CardActions sx={{justifyContent:"center"}}>
                        <Box display="flex" justifyContent="center" m="12px 0 12px 0">
                            <Button onClick={handleClick} color="secondary" variant="contained">
                                Choose Plan
                            </Button>
                        </Box>

                    </CardActions>
                </CardActionArea>
            </Card>

        </Box>

  );
}
