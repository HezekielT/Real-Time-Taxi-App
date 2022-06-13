import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

function Copyright() {
  const navigate = useNavigate();
    return (
      <Typography variant="body2" color="text.secondary">
        {'Copyright ©  '}
        <Link color="inherit" onClick={() => navigate('/')}>
          ride-app
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Footer = () => {
    return (
        
      
      <Box
        component="footer"
        sx={{
            display: 'flex',
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Real Time Ride Application
          </Typography>
          <Copyright />
        </Container>
      </Box>
    );
};

export default Footer;