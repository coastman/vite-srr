import http from './base';

export const getArticleList = async (params?: any) => await http.get('/article', { params });

export const getArticleDetail = async (id: number) => await http.get(`/article/${id}`);
