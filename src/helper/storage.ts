
export const get = (key: string) => localStorage.getItem(key);

export const del = (key: string) => localStorage.removeItem(key);

export const set = (key: string, data: string) => localStorage.setItem(key, data);
