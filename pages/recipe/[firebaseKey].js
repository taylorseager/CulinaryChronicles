import {
  Button,
  Card, CardActions, CardContent, CardMedia, Stack, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleRecipe } from '../../api/recipeData';
import getCategories from '../../api/categoryData';

export default function ViewSingleRecipeDetails() {
  const [recipeDetails, setRecipeDetails] = React.useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then((recipe) => {
      const updatedRecipe = { ...recipe[firebaseKey] };
      getCategories().then((categories) => {
        categories.forEach((category) => {
          if (category.firebaseKey === updatedRecipe.categoryId) {
            updatedRecipe.categoryName = category.categoryType;
            setRecipeDetails(updatedRecipe);
          }
        });
      });
    });
  }, [firebaseKey]);

  return (
    <Card sx={{ minWidth: 275, maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="250"
        image={recipeDetails.image}
        alt={recipeDetails.image}
      />
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          Name: {recipeDetails.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Recipe Creator: {recipeDetails.author}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Total Time: {recipeDetails.totalTime} (mins)
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Servings: {recipeDetails.servings}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Category: {recipeDetails.categoryName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Ingredients: {recipeDetails.ingredients}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Directions: {recipeDetails.directions}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Favorite: {recipeDetails.favorite ? 'Yes' : 'No'}
        </Typography>
        <CardActions>
          <Stack spacing={2} direction="row">
            <Button href={`/recipe/edit/${recipeDetails.firebaseKey}`} variant="contained">Edit</Button>
          </Stack>
        </CardActions>
      </CardContent>
    </Card>
  );
}
