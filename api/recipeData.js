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
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createNewRecipe = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Recipes.json"`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
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
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getRecipes,
  getSingleRecipe,
  createNewRecipe,
  deleteRecipe,
};
