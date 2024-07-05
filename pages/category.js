import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CategoryCard from '../components/CategoryCard';
import { useAuth } from '../utils/context/authContext';
import { getCategories } from '../api/categoryData';

function ViewAllCategories() {
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  const getAllCategories = () => {
    getCategories(user.uid).then((data) => {
      setCategories(data);
    });
  };

  useEffect(() => {
    getAllCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Grid container spacing={3} direction="row">
          {categories.map((category) => (
            <Grid item key={category.firebaseKey} xs={12} sm={6} md={4} lg={3}>
              {/* Adjust xs, sm, md, lg values based on how many cards you want per row */}
              <CategoryCard categoryObj={category} onUpdate={getAllCategories} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default ViewAllCategories;
