import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import {
  Button, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createNewRecipe, getRecipes, updateRecipe } from '../../api/recipeData';

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
  const [value, setValue] = React.useState([]);
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    console.warn('useeffect running');
    getRecipes(user.uid).then(setValue);

    if (recipeObj.firebaseKey) setFormInput(recipeObj);
  }, [recipeObj, user]);

  const handleChange = (e) => {
    setValue(e.target.value);
    // destructuring
    const { name } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    console.warn(formInput);
    e.preventDefault();
    console.warn(recipeObj.firebaseKey);
    if (recipeObj.firebaseKey) {
      updateRecipe(formInput).then(() => router.push(`/recipe/${recipeObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      console.warn('payload', payload);
      createNewRecipe(payload).then(({ name }) => {
        const firebaseKey = name;
        console.warn('firebasekey', firebaseKey);
        // router.push('/recipe');
        // const firebase = { firebaseKey: name };
        // updateRecipe(patchPayload).then(() => {
        //   router.push('/recipe');
        // });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Recipe</h1>
      <Grid container rowSpacing={8}>
        <Grid item xs={8}>
          {/* sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off" */}
          <Input
            name="title"
            placeholder="Recipe Name"
            variant="standard"
            // inputProps={formInput.title}
            onChange={handleChange}
            required
          />
          <Input
            name="totalTime"
            placeholder="Total Time Required"
            variant="standard"
            // inputProps={formInput.totalTime}
            onChange={handleChange}
            // {...register('totalTime')}
            required
          />
          <Input
            name="description"
            placeholder="Description"
            variant="standard"
            // inputProps={formInput.description}
            onChange={handleChange}
            required
          />
          <Input
            name="ingredients"
            placeholder="Ingredients"
            variant="standard"
            // inputProps={formInput.ingredients}
            onChange={handleChange}
            required
          />
          <Input
            name="category"
            placeholder="Category"
            variant="standard"
            // inputProps={formInput.ingredients}
            onChange={handleChange}
            required
          />
          <Input
            name="author"
            placeholder="Recipe Creator"
            variant="standard"
            // inputProps={formInput.ingredients}
            onChange={handleChange}
            required
          />
          <Input
            name="image"
            placeholder="Recipe Image"
            variant="standard"
            // inputProps={formInput.image}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Servings</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="servings"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <FormControlLabel
          control={(
            <Switch
              value={formInput.favorite}
              onChange={handleChange}
            />
          )}
          label="Favorite"
        />
        <Button type="submit" variant="contained">Submit</Button>
      </Grid>
    </form>
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
