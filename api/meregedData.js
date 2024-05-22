import { getSingleRecipe } from './recipeData';

const viewRecipeDetails = (recipeFirebaseKey) => new Promise((resolve, reject) => {
  getSingleRecipe(recipeFirebaseKey)
    .then((recipeObj) => {
      resolve({ recipeObj });
    }).catch((error) => reject(error));
});

export default viewRecipeDetails;
