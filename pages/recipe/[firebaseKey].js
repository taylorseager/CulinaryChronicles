import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {
  Button,
  Card, CardActions, CardContent, CardMedia, Stack, Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleRecipe } from '../../api/recipeData';
import { getCategories } from '../../api/categoryData';

export default function ViewSingleRecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setRecipeDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getCategories().then((categories) => {
      const cat = categories.find((c) => c.firebaseKey === recipeDetails.categoryId);
      setCategoryDetails(cat);
    });
  }, [recipeDetails]);

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
          Category: {categoryDetails?.categoryType}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Ingredients: {recipeDetails.ingredients}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Directions: {recipeDetails.directions}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Favorite: {recipeDetails.favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderOutlinedIcon />}
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
