const API_URL = 'https://jsonplaceholder.typicode.com/users';

const getAll = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export default getAll;
