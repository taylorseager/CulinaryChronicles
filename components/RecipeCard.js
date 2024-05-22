/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function RecipeCard({ recipeObj }) {
  console.warn('recipeObj', recipeObj);
  // const router = useRouter();
  // const { firebaseKey } = router.query;

  return (
    <Card style={{ width: '22rem' }}>
      {/* <Card.Img src={recipeObj.image} alt={recipeObj.title} style={{ height: '250px' }} /> */}
      <Card.Body>
        <Card.Title>Recipe Name:{recipeObj.title}</Card.Title>
        <Card.Text>
          <h6>Total Time: {recipeObj.totalTime} (mins)</h6>
          <h6>Servings: {recipeObj.servings}</h6>
          <h6>Category: {recipeObj.categoryId}</h6>
          <h6>Description: {recipeObj.description}</h6>
          <h6>Favorite: {recipeObj.favorite}</h6>
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
