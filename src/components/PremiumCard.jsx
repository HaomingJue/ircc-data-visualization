import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { tokens } from '../common/theme';

export default function PremiumCard(plan) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box backgroundColor= {colors.primary[400]}>
            <Card sx={{backgroundColor: colors.primary[400] , "& :hover": {backgroundColor: colors.primary[400]}}}>
                <CardActionArea >
                    <CardMedia
                    component="img"

                    image="/404.png"
                    alt="no image found"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{justifyContent:"center"}}>
                    <Box display="flex" justifyContent="center" m="12px 0 12px 0">
                        <Button type="submit" color="secondary" variant="contained">
                            Create New User
                        </Button>
                    </Box>

                </CardActions>
            </Card>

        </Box>

  );
}
