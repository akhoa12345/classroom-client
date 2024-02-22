import request from '../libs/utils/axios';

const INVITE_CLASSROOM_ENDPOINT = '/teachers/classroom-invite';
const TEACHER_CREATE_OR_UPDATE_IDMAPPING_ENDPOINT = (idUser) => `/teachers/id-mapping/${idUser}`;

export const inviteClassroom = (data) => {
  return request.post(INVITE_CLASSROOM_ENDPOINT, data);
};

export const createAndUpdateIdMappingByTeacher = (idUser, data) => {
  return request.patch(TEACHER_CREATE_OR_UPDATE_IDMAPPING_ENDPOINT(idUser), data);
};
