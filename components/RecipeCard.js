import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function RecipeCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Recipe Name:</Card.Title>
        <Card.Text>
          <p>Total Time:</p>
          <p>Servings: Dropdown</p>
          <p>Category:</p>
          <p>Description:</p>
        </Card.Text>
        <Button variant="primary">View</Button>
        <Button variant="secondary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
}
