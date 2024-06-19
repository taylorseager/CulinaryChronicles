import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecipeForm from '../../../components/forms/RecipeForm';
import { getSingleRecipe } from '../../../api/recipeData';

export default function EditRecipeForm() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <RecipeForm recipeObj={editItem} />
  );
}
