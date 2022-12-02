import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
          https://github.com/HaomingJue/ircc-data-visualization.git
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
    );
  }

export {Copyright};
