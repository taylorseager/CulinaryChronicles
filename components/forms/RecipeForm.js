import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, FormControlLabel } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createNewRecipe, updateRecipe } from '../../api/recipeData';

const initialState = {
  image: '',
  title: '',
  servings: 1,
  totalTime: '',
  description: '',
  ingredients: '',
  favorite: false,
};

export default function RecipeForm({ recipeObj }) {
  const [formInput, setFormInput] = React.useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    if (recipeObj.firebaseKey) setFormInput(recipeObj);
  }, [recipeObj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeObj.firebaseKey) {
      updateRecipe(formInput).then(() => router.push(`/recipe/${recipeObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createNewRecipe(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRecipe(patchPayload).then(() => {
          router.push('/recipe');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Box>Create Recipe</Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <br />
          <TextField
            id="standard-basic"
            label="Recipe Name"
            variant="standard"
            value={formInput.title}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Total Time Required"
            variant="standard"
            value={formInput.totalTime}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            value={formInput.description}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Ingredients"
            variant="standard"
            value={formInput.ingredients}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Recipe Image"
            variant="standard"
            value={formInput.image}
            onChange={handleChange}
          />
        </Box>
        <br />
        <Box>
          <FormControl sx={{ minWidth: 260 }}>
            <InputLabel id="demo-simple-select-label"># of Servings</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formInput.servings}
              label="# of Servings"
              onChange={handleChange}
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
        </Box>
        <br />
        <FormControlLabel control={<Switch defaultUnChecked />} label="Favorite" />
        <br />
        <Button type="submit" variant="contained">Submit</Button>
      </Form>
    </>
  );
}

RecipeForm.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    servings: PropTypes.number,
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
