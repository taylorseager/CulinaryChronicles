import { useEffect, useState } from 'react';
import {
  Button, Grid, Box,
} from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../api/recipeData';
import { useAuth } from '../utils/context/authContext';

export default function ViewRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getAllRecipes = () => {
    getRecipes(user.uid).then((data) => {
      setRecipes(data);
    });
  };

  useEffect(() => {
    getAllRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Grid sx={{ mb: 2 }}>
          <Button color="success" variant="contained" href="/recipe/newRecipe">
            Create New Recipe
          </Button>
        </Grid>
        <Grid container spacing={3} direction="row" style={{ flexGrow: 1 }}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.firebaseKey} style={{ display: 'flex', flexDirection: 'row' }}>
              <RecipeCard recipeObj={recipe} onUpdate={getAllRecipes} style={{ flexGrow: 1 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
