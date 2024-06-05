import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../api/recipeData';
import { useAuth } from '../utils/context/authContext';

export default function ViewRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getAllRecipes = () => {
    getRecipes(user.uid).then((data) => {
      console.warn(data);
      setRecipes(data);
    });
  };

  useEffect(() => {
    getAllRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button color="success" variant="outlined" href="/recipe/newRecipe">Create New Recipe</Button>
      <div>
        {recipes.map((recipe) => (
          <RecipeCard recipeObj={recipe} key={recipe.firebaseKey} onUpdate={getAllRecipes} />
        ))}
      </div>
    </>
  );
}
