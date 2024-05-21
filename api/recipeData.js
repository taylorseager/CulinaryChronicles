import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Pull all recipes from firebase
const getRecipes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Recipes.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export default getRecipes;
