import { Box, Button, Typography } from '@mui/material';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <Box
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h3">Hi there!</Typography>
      <Typography variant="h5">Click the button below to login!</Typography>
      <Button variant="contained" color="secondary" onClick={signIn}>
        Sign In
      </Button>
    </Box>
  );
}

export default Signin;
