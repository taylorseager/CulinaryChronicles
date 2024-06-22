import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Button, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup,
  Select,
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
      <Box sx={{ mt: 10 }}>
        <h1>{recipeObj.firebaseKey ? 'Update' : 'Create'} Recipe</h1>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={10} sm={14}>
              <TextField
                required
                fullWidth
                label="Recipe Name"
                name="title"
                variant="outlined"
                value={formInput.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={14}>
              <TextField
                required
                fullWidth
                label="Total Time Required"
                name="totalTime"
                variant="outlined"
                value={formInput.totalTime}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={14}>
              <TextField
                required
                fullWidth
                multiline
                label="Description"
                name="description"
                variant="outlined"
                value={formInput.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={14}>
              <TextField
                required
                fullWidth
                multiline
                label="Ingredients"
                name="ingredients"
                variant="outlined"
                value={formInput.ingredients}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={14}>
              <TextField
                required
                fullWidth
                multiline
                label="Directions"
                name="directions"
                variant="outlined"
                value={formInput.directions}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={14}>
              <TextField
                required
                fullWidth
                label="Recipe Creator"
                name="author"
                variant="outlined"
                value={formInput.author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={14}>
              <TextField
                required
                fullWidth
                label="Image"
                name="image"
                variant="outlined"
                value={formInput.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={14}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  id="category_dropdown"
                  label="Category"
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
            </Grid>
            <Grid item xs={10} sm={14}>
              <FormControl>
                <FormLabel id="servingsTitle">Servings</FormLabel>
                <RadioGroup
                  row
                  labelPlacement="top"
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="servings"
                  onChange={handleChange}
                  value={String(formInput.servings)}
                >
                  <FormControlLabel
                    labelPlacement="top"
                    value="1"
                    control={<Radio />}
                    label="1"
                  />
                  <FormControlLabel
                    labelPlacement="top"
                    value="2"
                    control={<Radio />}
                    label="2"
                  />
                  <FormControlLabel
                    labelPlacement="top"
                    value="4"
                    control={<Radio />}
                    label="4"
                  />
                  <FormControlLabel
                    labelPlacement="top"
                    value="6"
                    control={<Radio />}
                    label="6"
                  />
                  <FormControlLabel
                    labelPlacement="top"
                    value="8"
                    control={<Radio />}
                    label="8"
                  />
                  <FormControlLabel
                    labelPlacement="top"
                    value="10"
                    control={<Radio />}
                    label="10"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={14}>
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
            </Grid>
            <Grid item xs={10} sm={14}>
              <Button type="submit" variant="contained">{recipeObj.firebaseKey ? 'Update' : 'Submit'}</Button>
            </Grid>
          </Grid>
        </Box>
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
