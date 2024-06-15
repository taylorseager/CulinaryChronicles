import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Grid, TextField, Typography,
} from '@mui/material';
// import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  categoryType: '',
  image: '',
  firebaseKey: '',
};
export default function CategoryForm({ categoryObj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (categoryObj.firebaseKey) {
      setFormInput(categoryObj);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryObj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Typography component="h1" variant="h5">{categoryObj.firebaseKey ? 'Update' : 'Create'}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="categoryType"
              required
              fullWidth
              label="Name"
              value={formInput.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="image"
              name="Image"
              value={formInput.title}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Button type="submit" variant="contained">{categoryObj.firebaseKey ? 'Update' : 'Submit'}</Button>
    </>
  );
}

CategoryForm.propTypes = {
  categoryObj: PropTypes.shape({
    categoryType: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  categoryObj: initialState,
};
