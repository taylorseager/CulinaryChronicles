import { getSingleCategory } from './categoryData';
import { getSingleRecipe } from './recipeData';

const viewRecipeDetails = (recipeFirebaseKey, categoryFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleRecipe(recipeFirebaseKey), getSingleCategory(categoryFirebaseKey)])
    .then(([recipeObj]) => {
      console.warn(recipeObj);
      resolve({ ...recipeObj, category: recipeObj.categoryId });
    })
    .catch((error) => reject(error));
});

export default viewRecipeDetails;
