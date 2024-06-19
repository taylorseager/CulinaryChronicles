import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import {
  Autocomplete,
  Box,
  Button, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup,
  TextField,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createNewRecipe, updateRecipe } from '../../api/recipeData';
import { getCategories } from '../../api/categoryData';

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
  console.warn('recipeObj top', recipeObj);
  const [formInput, setFormInput] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState({ categoryType: '' });
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getCategories(user.uid).then((returnedCategories) => {
      const category = returnedCategories.find((cat) => cat.categoryType === 'Sides');
      setSelectedCategory(category);
      setCategories(returnedCategories);
    });

    if (recipeObj && recipeObj.firebaseKey) {
      console.warn('useEffect', recipeObj);
      getCategories(user.uid).then((returnedCategories) => {
        setCategories(returnedCategories);
        returnedCategories.forEach((category) => {
          if (category.firebaseKey === recipeObj.firebaseKey.categoryId) {
            setSelectedCategory(category);
          }
        });
      });
      setFormInput(recipeObj);
    }
  }, [firebaseKey, recipeObj, user.uid]);

  useEffect(() => {
    console.warn(formInput);
  }, [formInput]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFormInput({
      ...formInput,
      categoryId: category.firebaseKey,
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    console.warn(e.target);
    const newInputValue = e.target.type === 'checkbox' ? checked : e.target.value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newInputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeObj.firebaseKey) {
      console.warn('handle submit', recipeObj);
      updateRecipe(formInput).then(() => router.push(`/recipe/${recipeObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      console.warn('payload', payload);
      createNewRecipe(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRecipe(patchPayload).then(() => {
          router.push('/recipe');
        });
      });
    }
  };

  return (
    <form id="recipeForm" onSubmit={handleSubmit}>
      <h1>{recipeObj.firebaseKey ? 'Update' : 'Create'} Recipe</h1>
      <Box sx={{ mt: 3 }}>
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

          {selectedCategory && (
          <Autocomplete
            disablePortal
            id="category_dropdown"
            name="categoryId"
            options={categories}
            getOptionLabel={(option) => option.categoryType}
            isOptionEqualToValue={(option, value) => option.firebaseKey === value.firebaseKey}
            value={selectedCategory}
            onChange={(event, selectedOption) => handleCategoryChange(selectedOption || '')}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          )}
          <Grid>
            <FormControl>
              <FormLabel id="servingsTitle">Servings</FormLabel>
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
      </Box>
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
