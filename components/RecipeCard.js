/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function RecipeCard({ recipeObj }) {
  // const router = useRouter();
  // const { firebaseKey } = router.query;

  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img src={recipeObj.image} alt={recipeObj.title} style={{ height: '250px' }} /> */}
      <Card.Body>
        <Card.Title>Recipe Name:{recipeObj.title}</Card.Title>
        <Card.Text>
          <p>Total Time: {recipeObj.totalTime} (mins)</p>
          <p>Servings: {recipeObj.servings}</p>
          <p>Category: {recipeObj.categoryId}</p>
          <p>Description: {recipeObj.description}</p>
          <p>Favorite: {recipeObj.favorite}</p>
        </Card.Text>
        <Button variant="primary">View</Button>
        <Button variant="secondary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Card.Body>
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
    favorite: PropTypes.string,
  }).isRequired,
};
