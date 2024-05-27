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

const getSingleRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Recipes.json?orderBy="firebaseKey"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createNewRecipe = (recipeData) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Recipes.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData), // Pass recipe data in the request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }
      return response.json();
    })
    .then((data) => resolve(data)) // Resolve with response data
    .catch(reject);
});

const updateRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Recipes.json?orderBy="firebaseKey"&equalTo="${firebaseKey}"`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const deleteRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Recipes/${firebaseKey}.json"`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getRecipes,
  getSingleRecipe,
  createNewRecipe,
  deleteRecipe,
  updateRecipe,
};
