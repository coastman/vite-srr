import http from './base';

export const categoryList = async () => {
  return await http.get('/category');
};
