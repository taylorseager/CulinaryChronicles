import Card from '@mui/material/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import PropTypes from 'prop-types';
import { deleteRecipe, getRecipes } from '../api/recipeData';

export default function RecipeCard({ recipeObj, onUpdate }) {
  const deleteThisRecipe = () => {
    if (window.confirm(`Are you sure you want to delete this family heirloom: ${recipeObj.title}?`)) {
      deleteRecipe(recipeObj.firebaseKey).then(() => {
        onUpdate(getRecipes);
      });
    }
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="194"
        image={recipeObj.image}
        alt={recipeObj.image}
      />
      <CardContent>
        <Typography sx={{ fontSize: 24 }} fontWeight="bold" color="#45087B" gutterBottom>
          {recipeObj.title}  {recipeObj.favorite ? <FavoriteIcon fontSize="medium" color="error" /> : <FavoriteBorderOutlinedIcon fontSize="medium" />}
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Total Time:</Typography> {recipeObj.totalTime} (mins)
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Servings:</Typography> {(recipeObj.servings)}
        </Typography>
        <Typography sx={{ fontSize: 14 }}><Typography component="span" fontWeight="bold">Description:</Typography> {recipeObj.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/recipe/edit/${recipeObj.firebaseKey}`} variant="contained">Edit</Button>
        <Button href={`/recipe/${recipeObj.firebaseKey}`} variant="contained" color="secondary">View</Button>
        <Button variant="contained" color="error" onClick={deleteThisRecipe}>Delete</Button>
      </CardActions>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    servings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalTime: PropTypes.string,
    categoryId: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
