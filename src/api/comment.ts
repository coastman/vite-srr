import http from './base';

export const fetchCommentByArticle = async (id: number) => {
  return await http.get(`/comment/byArticle/${id}`)
};

export const addComment = async (data: any) => {
  return await http.post('/comment', data)
};

export const likeComment = async (data: any) => await http.post('/comment/like', data);

export const dislikeComment = async (data: any) => await http.post('/comment/down', data);
