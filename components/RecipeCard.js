import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Stack } from '@mui/material';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function RecipeCard({ recipeObj }) {
  // const router = useRouter();
  // const { firebaseKey } = router.query;

  return (
    <Card sx={{ minWidth: 275, maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="194"
        image={recipeObj.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          Name: {recipeObj.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Total Time: {recipeObj.totalTime} (mins)
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Servings: {recipeObj.servings}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Category: {recipeObj.categoryId}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Description: {recipeObj.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          Favorite: {recipeObj.favorite}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={2} direction="row">
          <Button variant="contained">Edit</Button>
          <Button variant="contained">View</Button>
          <Button variant="contained">Delete</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    servings: PropTypes.number,
    totalTime: PropTypes.number,
    categoryId: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
};
