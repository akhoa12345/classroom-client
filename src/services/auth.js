import request from '../libs/utils/axios';

const SIGN_IN_ENDPOINT = '/users/login';
const SIGN_UP_ENDPOINT = '/users/signup';
const GET_ME_ENDPOINT = '/users/me';
const LOG_OUT_ENDPOINT = '/users/logout';
const UDPATE_PROFILE_ENDPOINT = '/users/me';
const FACEBOOK_LOGIN_ENDPOINT = '/auth/login/facebook';
const ACCEPT_SEND_EMAIL_ENDPOINT = '/users/accept-send-email';
const SEND_VERIFY_EMAIL = '/users/send-verification-email';

export const signIn = (data) => {
  return request.post(SIGN_IN_ENDPOINT, data);
};

export const signUp = (data) => {
  return request.post(SIGN_UP_ENDPOINT, data);
};

export const getMe = () => {
  return request.get(GET_ME_ENDPOINT);
};

export const updateProfile = (data) => {
  return request.patch(UDPATE_PROFILE_ENDPOINT, data);
};

export const logOut = () => {
  return request.get(LOG_OUT_ENDPOINT);
};

export const facebookLogin = () => {
  return request.get(FACEBOOK_LOGIN_ENDPOINT);
};

export const acceptSendEmail = (data) => {
  return request.post(ACCEPT_SEND_EMAIL_ENDPOINT, data);
};

export const resetPassword = (verifyToken, data) => {
  request.get(`/users/reset-password?token=${verifyToken}`);
  return request.post(`/users/reset-password?token=${verifyToken}`, data);
};

export const verify = (verifyToken) => {
  return request.get(`/users/verify?token=${verifyToken}`);
};

export const sendVerifyEmail = () => {
  return request.get(SEND_VERIFY_EMAIL);
};
