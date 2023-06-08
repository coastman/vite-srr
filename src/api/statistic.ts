import http from './base';

export const getStatistic = async () => await http.get('/statistic');
