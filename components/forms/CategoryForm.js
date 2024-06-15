// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Grid, TextField, Typography,
} from '@mui/material';

const initialState = {
  categoryType: '',
  image: '',
  firebaseKey: '',
};
export default function CategoryForm({ categoryObj }) {
  // const [formInput, setFormInput] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Typography component="h1" variant="h5">{categoryObj.firebasekey ? 'Update' : 'Create'}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

CategoryForm.propTypes = {
  categoryObj: PropTypes.shape({
    categoryType: PropTypes.string,
    image: PropTypes.string,
    firebasekey: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  categoryObj: initialState,
};
