export const getJwt = () => {
  return localStorage.getItem('jwt');
};

export const setJwt = (token) => {
  localStorage.setItem('jwt', token);
};

export const setRedirect = (url) => {
  localStorage.setItem('redirect', url);
};
export const getRedirect = () => {
  localStorage.getItem('redirect');
};

export const removeRedirect = () => {
  localStorage.removeItem('redirect');
};
