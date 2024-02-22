import request from '../libs/utils/axios';

const CREATE_CLASSROOM_ENDPOINT = '/teachers/new-classroom';
const GET_MY_CLASSROOM_ENDPOINT = '/users/me/classrooms';
const GET_DETAIL_CLASSROOM_ENDPOINT = '/classroom/';
const GET_CLASSROOM_PARTICIPANT_ENDPOINT = '/participants';
const CHECK_JOINED_CLASSROOM_ENDPOINT = '/users/me/joined-classroom';
const JOIN_CLASSROOM_BY_CODE_ENDPOINT = '/users/join-classroom';
const INVITE_TO_CLASSROOM_ENDPOINT = (classroomId, joinCode) => `/classroom/invite/${classroomId}?joinCode=${joinCode}`;
// Grade
const GET_STUDENT_GRADE_ENDPOINT = '/students/grade/';
const GET_STRUCTURE_GRADE_ENDPOINT = (idClass) => `/classroom/${idClass}/structureGrade`;
const GET_ALL_STUDENT_GRADE_IN_ENDPOINT = (idClass) => `/classroom/${idClass}/studentGrade`;
const GET_CLASSROOM_STATUS_ENDPOINT = (idClass) => `/classroom/${idClass}/status`;
// ReviewComment
const REVIEW_GRADE_ENDPOINT = '/gradeReview/';

export const createClassroom = (data) => {
  return request.post(CREATE_CLASSROOM_ENDPOINT, data);
};

export const getMyClassroom = () => {
  return request.get(GET_MY_CLASSROOM_ENDPOINT);
};

export const getDetailClassroomById = (idClass) => {
  return request.get(GET_DETAIL_CLASSROOM_ENDPOINT + idClass);
};

export const getClassroomParticipant = (idClass) => {
  return request.get(GET_DETAIL_CLASSROOM_ENDPOINT + idClass + GET_CLASSROOM_PARTICIPANT_ENDPOINT);
};

export const inviteToClassroom = (classroomId, joinCode) => {
  return request.get(INVITE_TO_CLASSROOM_ENDPOINT(classroomId, joinCode));
};

export const checkJoinedClassroom = (classroomId) => {
  return request.get(`${CHECK_JOINED_CLASSROOM_ENDPOINT}/${classroomId}`);
};

export const joinClassroomByCode = (code) => {
  return request.post(`${JOIN_CLASSROOM_BY_CODE_ENDPOINT}/${code}`);
};

export const getStudentGrade = (classroomId) => {
  return request.get(GET_STUDENT_GRADE_ENDPOINT + classroomId);
};

export const getStructureGrade = (idClass) => {
  return request.get(GET_STRUCTURE_GRADE_ENDPOINT(idClass));
};

export const getAllStudentGradeInClassroom = (idClass) => {
  return request.get(GET_ALL_STUDENT_GRADE_IN_ENDPOINT(idClass));
};

// ReviewComment
export const postGradeReview = (data) => {
  return request.post(REVIEW_GRADE_ENDPOINT, data);
};

export const getReviewDetail = (reviewId) => {
  return request.get(REVIEW_GRADE_ENDPOINT + reviewId);
};

export const postComment = (reviewId, data) => {
  return request.post(REVIEW_GRADE_ENDPOINT + reviewId + '/comments', data);
};
export const getClassroomStatus = (id) => {
  return request.get(GET_CLASSROOM_STATUS_ENDPOINT(id));
};
