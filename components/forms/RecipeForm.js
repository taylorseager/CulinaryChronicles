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
  const [formInput, setFormInput] = React.useState({});
  const [defaultCategory, setDefaultCategory] = React.useState('Sides');
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const categoriesList = [
    { label: 'Sides', firebaseKey: '-NyNp_CsuaAhfcnO4jPL' },
    { label: 'Main Dishes', firebaseKey: '-NyNp_CtPiAKY1_g5cf4' },
    { label: 'Desserts', firebaseKey: '-NyNp_Cupvv-4epYPvaX' },
    { label: 'Soups', firebaseKey: '-NyNp_CvjHj--Z4Le7Zb' },
    { label: 'Drinks', firebaseKey: '-NyNp_CwN9DUrRY3mjmk' },
  ];

  // create a function here to get the category data and put it in a useState like with recipies

  React.useEffect(() => {
    if (recipeObj && Object.keys(recipeObj) && recipeObj[firebaseKey]) {
      getCategories().then((categories) => {
        categories.forEach((category) => {
          if (category.firebaseKey === recipeObj[firebaseKey].categoryId) {
            setDefaultCategory(category.categoryType);
          }
        });
      });
      setFormInput(recipeObj[firebaseKey]);
    }
    console.warn(recipeObj);
  }, [firebaseKey, recipeObj]);

  React.useEffect(() => {
    console.warn(formInput.title);
  }, [formInput]);

  // function takes in firebase key from selected value
  const handleCategoryChange = (fbk) => {
    setFormInput({
      ...formInput,
      categoryId: fbk,
    });
  };

  const handleChange = (e) => {
    console.warn(e);
    const { name, checked } = e.target;
    console.warn(checked);
    const newInputValue = e.target.type === 'checkbox' ? checked : e.target.value;
    console.warn(newInputValue);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newInputValue,
    }));
  };

  const handleSubmit = (e) => {
    console.warn(formInput);
    e.preventDefault();
    console.warn(recipeObj.firebaseKey);
    if (recipeObj[firebaseKey].firebaseKey) {
      updateRecipe(formInput).then(() => router.push(`/recipe/${recipeObj[firebaseKey].firebaseKey}`));
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
    <form onSubmit={handleSubmit}>
      <h1>Create Recipe</h1>
      <Grid container rowSpacing={8}>
        <Grid item xs={8}>
          {/* sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off" */
            console.warn(formInput.title)
            }
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
            // {...register('totalTime')}
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
          options={categoriesList}
          value={defaultCategory}
          getOptionSelected={(option, v) => option.firebaseKey === v.firebaseKey}
          onChange={(event, selectedOption) => handleCategoryChange(selectedOption ? selectedOption.firebaseKey : '')}
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
