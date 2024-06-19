import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecipeForm from '../../../components/forms/RecipeForm';
import { getSingleRecipe } from '../../../api/recipeData';

export default function EditRecipeForm() {
  const [editItem, setEditItem] = useState({});
  console.warn('edit', editItem);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setEditItem);
    console.warn('single recipe', firebaseKey);
  }, [firebaseKey]);

  return (
    <RecipeForm recipeObj={editItem} />
  );
}
