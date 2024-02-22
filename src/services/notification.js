import request from '../libs/utils/axios';

const GET_USER_NOTIFICATION = '/users/notifications';
const PATCH_SEEN_NOTIFICATION = '/notifications/';
const CLASSROOM = '/classroom/';

export const getUserNotification = () => {
  return request.get(GET_USER_NOTIFICATION);
};

export const patchSeenNotification = (notificationId, data) => {
  return request.patch(PATCH_SEEN_NOTIFICATION + notificationId, data);
};

export const notifyAnotherUserInClassroom = (classroomId, data) => {
  return request.post(CLASSROOM + classroomId + '/unicast', data);
};

export const notifyAllStudentInClassroom = (classroomId, data) => {
  return request.post(CLASSROOM + classroomId + '/broadcast', data);
};
