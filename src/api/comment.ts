import http from './base';

export const fetchCommentByArticle = async (id: number) => {
  return await http.get(`/comment/byArticle/${id}`)
};

export const addComment = async (data: any) => {
  return await http.post('/comment', data)
};
