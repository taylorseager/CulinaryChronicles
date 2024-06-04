import { Button } from '@mui/material';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}!</h1>
      <Button color="success" variant="outlined" href="/recipe/newRecipe">Create New Recipe</Button>
      <Button color="error" variant="outlined" onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default Home;
