import axios from './axios';

export const quantityInStock = async (id) => {
  const response = await axios.post('/factory/quantityInStock', {
    productLine: id,
  });
  return response.data;
};
