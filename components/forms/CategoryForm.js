import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Box, Button, Grid, TextField, Typography,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createNewCategory, updateCategory } from '../../api/categoryData';

const initialState = {
  categoryType: '',
  image: '',
};
export default function CategoryForm({ categoryObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (categoryObj.firebaseKey) {
      setFormInput(categoryObj);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryObj.firebaseKey) {
      updateCategory(formInput).then(() => router.push('/category'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createNewCategory(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCategory(patchPayload).then(() => {
          router.push('/category');
        });
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5">{categoryObj.firebaseKey ? 'Update' : 'Create'} Category
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Name"
                name="categoryType"
                value={formInput.categoryType}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Image"
                name="image"
                value={formInput.image}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Button type="submit" variant="contained">{categoryObj.firebaseKey ? 'Update' : 'Submit'}</Button>
      </form>
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
