import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';

export default function CategoryCard({ categoryObj }) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 400 }}>
      {/* <Card.Img src={categoryObj.image} alt={categoryObj.title} style={{ height: '250px' }} /> */}
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          {categoryObj.categoryType}
        </Typography>
      </CardContent>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    image: PropTypes.string,
    categoryType: PropTypes.string,
  }).isRequired,
};
