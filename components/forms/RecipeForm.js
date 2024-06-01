import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, FormControlLabel, FormGroup } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createNewRecipe, updateRecipe } from '../../api/recipeData';

const initialState = {
  image: '',
  title: '',
  servings: '',
  totalTime: '',
  description: '',
  ingredients: '',
  favorite: false,
};

export default function RecipeForm({ recipeObj }) {
  const { register } = useForm(initialState); // tracks data input
  const router = useRouter();
  const { user } = useAuth();

  const initialServings = recipeObj ? recipeObj.servings : 1;

  React.useEffect(() => {
    if (recipeObj.firebaseKey) register(recipeObj);
  }, [register, recipeObj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeObj.firebaseKey) {
      updateRecipe(register).then(() => router.push(`/recipe/${recipeObj.firebaseKey}`));
    } else {
      const payload = { ...register, uid: user.uid };
      createNewRecipe(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRecipe(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>Create Recipe</Box>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Recipe Name"
          variant="standard"
          {...register('title')}
          required
        />
        <TextField
          id="standard-basic"
          label="Total Time Required"
          variant="standard"
          {...register('totalTime')}
          required
        />
        <TextField
          id="standard-basic"
          label="Description"
          variant="standard"
          {...register('description')}
          required
        />
        <TextField
          id="standard-basic"
          label="Ingredients"
          variant="standard"
          {...register('ingredients')}
          required
        />
        <TextField
          id="standard-basic"
          label="Recipe Author"
          variant="standard"
          {...register('author')}
          required
        />
        <TextField
          id="standard-basic"
          label="Image"
          variant="standard"
          {...register('image')}
          required
        />
      </Box>
      <Box>
        <FormGroup>
          <FormControl sx={{ minWidth: 260 }}>
            <InputLabel id="demo-simple-select-label"># of Servings</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="# of Servings"
              defaultValue={initialServings}
              {...register('servings')}
              required
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </Box>
      <FormControlLabel
        control={<Switch />}
        label="Favorite"
        {...register('servings')}
      />
      <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
    </>
  );
}

RecipeForm.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    servings: PropTypes.string,
    totalTime: PropTypes.string,
    categoryId: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

RecipeForm.defaultProps = {
  recipeObj: initialState,
};
