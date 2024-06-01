import * as React from 'react';
import { useState } from 'react';
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

  React.useEffect(() => {
    getAllRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard recipeObj={recipe} key={recipe.firebaseKey} onUpdate={getAllRecipes} />
      ))}
    </div>
  );
}
