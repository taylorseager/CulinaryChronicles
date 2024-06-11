import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import {
  Autocomplete,
  Button, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup,
  TextField,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createNewRecipe, updateRecipe } from '../../api/recipeData';
import getCategories from '../../api/categoryData';

const initialState = {
  image: '',
  title: '',
  servings: 1,
  totalTime: '',
  description: '',
  directions: '',
  categoryId: '',
  author: '',
  ingredients: '',
  favorite: false,
};

export default function RecipeForm({ recipeObj }) {
  const [formInput, setFormInput] = React.useState(initialState);
  const [selectedCategory, setSelectedCategory] = React.useState({ });
  const [categories, setCategories] = React.useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const handleCategoryChange = (category) => {
    const cat = categories.find((c) => c.firebaseKey === category);
    setSelectedCategory(cat);
  };

  React.useEffect(() => {
    getCategories().then(setCategories);

    if (recipeObj.firebaseKey) {
      setFormInput(recipeObj);
      handleCategoryChange(recipeObj?.categoryId);
    }
  }, [firebaseKey, recipeObj, selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.warn(e.target);
    // const newInputValue = e.target.type === 'checkbox' ? checked : e.target.value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeObj[firebaseKey] && recipeObj[firebaseKey].firebaseKey) {
      updateRecipe(formInput).then(() => router.push(`/recipe/${recipeObj[firebaseKey].firebaseKey}`));
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
    <form onSubmit={handleSubmit}>
      <h1>{recipeObj.firebaseKey ? 'Update' : 'Create'} Recipe</h1>
      <Grid container rowSpacing={8}>
        <Grid item xs={8}>
          <Input
            name="title"
            placeholder="Recipe Name"
            variant="standard"
            value={formInput.title}
            onChange={handleChange}
            required
          />
          <Input
            name="totalTime"
            placeholder="Total Time Required"
            variant="standard"
            value={formInput.totalTime}
            onChange={handleChange}
            required
          />
          <Input
            name="description"
            placeholder="Description"
            variant="standard"
            value={formInput.description}
            onChange={handleChange}
            required
          />
          <Input
            name="ingredients"
            placeholder="Ingredients"
            variant="standard"
            value={formInput.ingredients}
            onChange={handleChange}
            required
          />
          <Input
            name="directions"
            placeholder="Directions"
            variant="standard"
            value={formInput.directions}
            onChange={handleChange}
            required
          />
          <Input
            name="author"
            placeholder="Recipe Creator"
            variant="standard"
            value={formInput.author}
            onChange={handleChange}
            required
          />
          <Input
            name="image"
            placeholder="Recipe Image"
            variant="standard"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Grid>

        <Autocomplete
          disablePortal
          id="category_dropdown"
          name="categoryId"
          options={categories.map((cat) => cat.categoryType)}
          // getOptionLabel={(option) => option.categoryType === selectedCategory.categoryType}
          isOptionEqualToValue={(option, value) => console.warn(option, value)}
          inputValue={selectedCategory?.categoryType}
          value={formInput.categoryId}
          onChange={handleChange}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />

        <Grid>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Servings</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="servings"
              onChange={handleChange}
              value={String(formInput.servings)}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="6" control={<Radio />} label="6" />
              <FormControlLabel value="8" control={<Radio />} label="8" />
              <FormControlLabel value="10" control={<Radio />} label="10" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <FormControlLabel
          control={(
            <Switch
              name="favorite"
              checked={formInput.favorite}
              onChange={handleChange}
            />
          )}
          label="Favorite"
        />
        <Button type="submit" variant="contained">{recipeObj.firebaseKey ? 'Update' : 'Submit'}</Button>
      </Grid>
    </form>
  );
}

RecipeForm.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    servings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
