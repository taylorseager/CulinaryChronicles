/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function CategoryCard({ categoryObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img src={categoryObj.image} alt={categoryObj.title} style={{ height: '250px' }} /> */}
      <Card.Body>
        <Card.Title>Category: {categoryObj.categoryType}</Card.Title>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    image: PropTypes.string,
    categoryType: PropTypes.string,
  }).isRequired,
};
