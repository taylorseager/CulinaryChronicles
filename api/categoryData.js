import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Categories.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createNewCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Categories.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Categories/${payload.firebaseKey}.json`, {
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

const deleteCategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/category/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        resolve();
      } else {
        reject(new Error('Failed to delete category'));
      }
    })
    .catch(reject);
});

export {
  getCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
