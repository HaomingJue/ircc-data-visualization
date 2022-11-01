import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
          Error Makers
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
    );
  }

export {Copyright};