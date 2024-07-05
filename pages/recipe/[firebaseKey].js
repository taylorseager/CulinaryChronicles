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
import { useAuth } from '../../utils/context/authContext';

export default function ViewSingleRecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleRecipe(firebaseKey).then((recipe) => {
      setRecipeDetails(recipe);
    });
  }, [firebaseKey]);

  useEffect(() => {
    getCategories(user.uid).then((categories) => {
      const cat = categories.find((c) => c.firebaseKey === recipeDetails.categoryId);
      setCategoryDetails(cat);
    });
  }, [recipeDetails, user.uid]);

  return (
    <Card sx={{
      minWidth: 275, maxWidth: 500, padding: 2, margin: '75px',
    }}
    >
      <CardMedia
        component="img"
        height="250"
        image={recipeDetails.image}
        alt={recipeDetails.image}
      />
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="#45087B">
          {recipeDetails.title}  {recipeDetails.favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderOutlinedIcon />}
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Recipe Creator:</Typography> {recipeDetails.author}
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Total Time:</Typography> {recipeDetails.totalTime} (mins)
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Servings:</Typography> {recipeDetails.servings}
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Category:</Typography> {categoryDetails?.categoryType}
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Ingredients:</Typography> {recipeDetails.ingredients}
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Directions:</Typography> {recipeDetails.directions}
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
