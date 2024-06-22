import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Button, FormControlLabel, FormLabel, Grid, Input, InputLabel, MenuItem, Radio, RadioGroup,
  Select,
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
  const [formInput, setFormInput] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    if (recipeObj && recipeObj.firebaseKey) {
      getCategories(user.uid).then((returnedCategories) => {
        const selected = returnedCategories.find((category) => category.firebaseKey === recipeObj.firebaseKey.categoryId);
        setSelectedCategory(selected);
        setCategories(returnedCategories);
        setFormInput(recipeObj);
      });
    } else {
      getCategories(user.uid).then((returnedCategories) => {
        setSelectedCategory(null);
        setCategories(returnedCategories);
      });
    }
  }, [firebaseKey, recipeObj, setSelectedCategory, user.uid]);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const selected = categories.find((cat) => cat.firebaseKey === categoryId);
    setSelectedCategory(selected);
    setFormInput({
      ...formInput,
      categoryId,
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const newInputValue = e.target.type === 'checkbox' ? checked : e.target.value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newInputValue,
    }));
  };

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
    <form id="recipeForm" onSubmit={handleSubmit}>
      <h1>{recipeObj.firebaseKey ? 'Update' : 'Create'} Recipe</h1>
      <Box sx={{ mt: 5, gap: 5 }}>
        <Grid container rowSpacing={8}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>Title</InputLabel>
              <Input
                name="title"
                placeholder="Recipe Name"
                variant="standard"
                value={formInput.title}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Total Time Required</InputLabel>
              <Input
                name="totalTime"
                placeholder="Total Time Required"
                variant="standard"
                value={formInput.totalTime}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Description</InputLabel>
              <Input
                name="description"
                placeholder="Description"
                variant="standard"
                value={formInput.description}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Ingredients</InputLabel>
              <Input
                name="ingredients"
                placeholder="Ingredients"
                variant="standard"
                value={formInput.ingredients}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Directions</InputLabel>
              <Input
                name="directions"
                placeholder="Directions"
                variant="standard"
                value={formInput.directions}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Recipe Creator</InputLabel>
              <Input
                name="author"
                placeholder="Recipe Creator"
                variant="standard"
                value={formInput.author}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Image</InputLabel>
              <Input
                name="image"
                placeholder="Recipe Image"
                variant="standard"
                value={formInput.image}
                onChange={handleChange}
                required
              />
            </FormControl>

          </Grid>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              id="category_dropdown"
              value={formInput.categoryId}
              onChange={handleCategoryChange}
              sx={selectedCategory}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.firebaseKey}
                  value={category.firebaseKey}
                >
                  {category.categoryType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
