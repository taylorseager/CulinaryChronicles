import * as React from 'react';
import { useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';
import { useAuth } from '../utils/context/authContext';
import { getCategories } from '../api/categoryData';

function ViewAllCategories() {
  const [categories, setCategories] = React.useState([]);
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
    <div>
      {categories.map((category) => (
        <CategoryCard categoryObj={category} key={category.firebaseKey} onUpdate={getAllCategories} />
      ))}
    </div>
  );
}

export default ViewAllCategories;
