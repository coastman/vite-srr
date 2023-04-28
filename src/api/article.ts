import http from './base';

export const getArticleList = async (params?: any) => {
  console.log(params);
  return await http.get('/article', { params })
};
