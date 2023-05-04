import http from './base';

export const getArticleList = async (params?: any) => {
  return await http.get('/article', { params })
};
