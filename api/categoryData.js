import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategories = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Categories.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        const categoriesArray = Object.values(data);
        resolve(categoriesArray);
      } else {
        throw new Error('Data is empty or undefined');
      }
    })
    .catch((error) => {
      reject(error);
    });
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
  fetch(`${endpoint}/Categories/${firebaseKey}.json`, {
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

const getSingleCategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Categories/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
};
