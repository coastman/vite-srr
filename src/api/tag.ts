import http from './base';

export const tagList = async (params: any) => {
  return await http.get('/tag', { params });
};
