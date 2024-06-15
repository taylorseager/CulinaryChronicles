import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Button, CardMedia, Stack } from '@mui/material';
// import { useRouter } from 'next/router';

export default function CategoryCard({ categoryObj }) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="194"
        image={categoryObj.image}
        alt={categoryObj.image}
      />
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          {categoryObj.categoryType}
        </Typography>
        <Stack spacing={2} direction="row">
          <Button href={`/category/edit/${categoryObj.firebaseKey}`} variant="contained">Edit</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    image: PropTypes.string,
    categoryType: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
