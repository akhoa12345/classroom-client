import axios from 'axios';

import { APP_CONFIGS } from '../constants/appConfig';

import { getJwt } from './localStorage';

const requestAuthInterceptor = async (req) => {
  const jwt = getJwt();

  if (jwt) {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${jwt}`,
      },
    };
  }

  return req;
};

const instance = axios.create({
  baseURL: `${APP_CONFIGS.API_URL}/api`,
});

instance.interceptors.request.use(requestAuthInterceptor);

export default instance;
