import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CategoryForm from '../../../components/forms/CategoryForm';
import { getSingleCategory } from '../../../api/categoryData';

export default function EditCategoryForm() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCategory(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <CategoryForm categoryObj={editItem} />

  );
}
