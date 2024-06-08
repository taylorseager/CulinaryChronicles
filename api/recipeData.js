import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Pull all recipes from firebase
const getRecipes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes.json?orderBy="uid"&equalTo="${uid}"`, {
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
  fetch(`${endpoint}/recipes.json?orderBy="firebaseKey"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createNewRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), // Pass recipe data in the request body
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const deleteRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recipes/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        resolve();
      } else {
        reject(new Error('Failed to delete recipe'));
      }
    })
    .catch(reject);
});

export {
  getRecipes,
  getSingleRecipe,
  createNewRecipe,
  deleteRecipe,
  updateRecipe,
};
