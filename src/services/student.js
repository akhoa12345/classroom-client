import request from '../libs/utils/axios';

const CREATE_OR_UPDATE_IDMAPPING_ENDPOINT = '/users/me';

export const createAndUpdateIdMapping = (data) => {
  return request.patch(CREATE_OR_UPDATE_IDMAPPING_ENDPOINT, data);
};
