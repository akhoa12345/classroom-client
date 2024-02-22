import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

import ClassroomRoute from './components/guards/ClassroomRoute';
import Page_Layout from './components/shared/layout';
import AuthContext from './contexts/auth/auth-context';
import NotificationContext from './contexts/notification/notificationContext';
import NotificationPopupProvider from './contexts/notification-popup/notification-popup-provider';
import useAuth from './hooks/useAuth';
import AcceptJoinClass from './pages/accept-join-class';
import AcceptToSentEmailResetPassword from './pages/accept-send-email';
import AccountLocked from './pages/account-locked';
import ClassDetail from './pages/class-detail';
import ShowClassroomMembers from './pages/classroom-members';
import CreateClassroom from './pages/create-classroom';
import GradeBoard from './pages/grade-board';
import GradeReview from './pages/grade-review';
import GradeStructure from './pages/grade-structure';
import Home from './pages/home';
import ReadFileExcelListStudents from './pages/import-excel-list-students';
import Landing from './pages/landing';
import LoginSuccess from './pages/notification/login-success';
import Notifications from './pages/notifications';
import ResetPassword from './pages/reset-password';
import ReviewComment from './pages/review-comment';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import MappingStudentID from './pages/student-mapping-id';
import StudentViewGrade from './pages/student-view-grade';
import SuccessPage from './pages/successPage';
import UploadGradeFile from './pages/upload-grade-file';
import UserProfile from './pages/user-profile';
import { getMe } from './services/auth';

const ProtectedRoute = ({ children }) => {
  const { user, userLoaded } = useAuth();
  const location = useLocation();
  if (!user && userLoaded) {
    return <Navigate to="/sign-in" replace state={{ redirect: location }} />;
  }
  if (user && user.isLocked) {
    return <Navigate to="/account-locked" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
};

const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={'/'} replace />;
  }
  return children;
};

AuthRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
};

const RestrictedRoute = ({ role, children }) => {
  const { user, userLoaded } = useAuth();
  const { openNotification } = useContext(NotificationContext);
  if ((!user || user.role !== role) && userLoaded) {
    openNotification({
      title: 'Không có quyền truy cập',
      type: 'error',
      description: 'Hãy đăng nhập với quyền phù hợp để truy cập chức năng',
    });
    return <Navigate to="/" replace />;
  }
  return children;
};

RestrictedRoute.propTypes = {
  role: PropTypes.string,
  children: PropTypes.node,
};

function App() {
  const { setUser, setLoaded } = React.useContext(AuthContext);
  useEffect(() => {
    const initUserData = async () => {
      try {
        const response = await getMe();
        const userData = response.data.data;
        setUser(userData);
        setLoaded(true);
        console.log(userData);
      } catch (err) {
        setLoaded(true);
        console.log('Not logged in');
      }
    };
    initUserData();
  }, [setUser, setLoaded]);
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Page_Layout />}>
          <Route path="/" element={<Landing />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <AuthRoute>
                <SignIn />
              </AuthRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <AuthRoute>
                <ResetPassword />
              </AuthRoute>
            }
          />
          <Route
            path="/accept-send-email"
            element={
              <AuthRoute>
                <AcceptToSentEmailResetPassword />
              </AuthRoute>
            }
          />

          <Route path="/login-success/:token" element={<LoginSuccess />} />
          <Route
            path="/classroom/:id"
            element={
              <ProtectedRoute>
                <ClassroomRoute>
                  <ClassDetail />
                </ClassroomRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id/participants"
            element={
              <ProtectedRoute>
                <ClassroomRoute>
                  <ShowClassroomMembers />
                </ClassroomRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/invite/:classroomId"
            element={
              <ProtectedRoute>
                <ClassroomRoute>
                  <AcceptJoinClass />
                </ClassroomRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id"
            element={
              <ProtectedRoute>
                <ClassroomRoute>
                  <ClassDetail />
                </ClassroomRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id/participants"
            element={
              <ProtectedRoute>
                <ClassroomRoute>
                  <ShowClassroomMembers />
                </ClassroomRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id/grade-structure"
            element={
              <ProtectedRoute>
                <RestrictedRoute role="teacher">
                  <ClassroomRoute>
                    <GradeStructure />
                  </ClassroomRoute>
                </RestrictedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id/grade-board"
            element={
              <ProtectedRoute>
                <RestrictedRoute role="teacher">
                  <ClassroomRoute>
                    <GradeBoard />
                  </ClassroomRoute>
                </RestrictedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id/upload-grade-file"
            element={
              <ProtectedRoute>
                <RestrictedRoute role="teacher">
                  <ClassroomRoute>
                    <UploadGradeFile />
                  </ClassroomRoute>
                </RestrictedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id/import-excel-list-student"
            element={
              <ProtectedRoute>
                <RestrictedRoute role="teacher">
                  <ClassroomRoute>
                    <ReadFileExcelListStudents />
                  </ClassroomRoute>
                </RestrictedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id/grade-review"
            element={
              <ProtectedRoute>
                <ClassroomRoute>
                  <GradeReview />
                </ClassroomRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/classroom/invite/:classroomId" element={<AcceptJoinClass />} />

          <Route
            path="/classroom/:id/studentGrade"
            element={
              <ProtectedRoute>
                <RestrictedRoute role="student">
                  <ClassroomRoute>
                    <StudentViewGrade />
                  </ClassroomRoute>
                </RestrictedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-mapping-id"
            element={
              <ProtectedRoute>
                <RestrictedRoute role="student">
                  <MappingStudentID />
                </RestrictedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom/:id/grade-review/:reviewId"
            element={
              <ProtectedRoute>
                <ClassroomRoute>
                  <ReviewComment />
                </ClassroomRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-classroom"
            element={
              <ProtectedRoute>
                <RestrictedRoute role="teacher">
                  <CreateClassroom>
                    <NotificationPopupProvider></NotificationPopupProvider>
                  </CreateClassroom>
                </RestrictedRoute>
              </ProtectedRoute>
            }
          />

          <Route path="/account-locked" element={<AccountLocked />} />
        </Route>

        <Route path="/verify" element={<SuccessPage />} />
      </Routes>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  `;
