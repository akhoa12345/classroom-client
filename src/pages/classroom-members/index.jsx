import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';

import ExcelExportButton from '../../components/shared/exportToExcel';
import SubMenu from '../../components/shared/subMenu';
import NotificationContext from '../../contexts/notification/notificationContext';
import useAuth from '../../hooks/useAuth';
import { getClassroomParticipant } from '../../services/classroom';
import { inviteClassroom } from '../../services/teacher';

import InviteModal from './components/InviteModal';

export default function ShowClassroomMembers() {
  const [classParticipants, setClassParticipants] = useState();
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [email, setEmail] = useState('');
  const { openNotification } = useContext(NotificationContext);
  const { isTeacher } = useAuth();

  const location = useLocation();

  const idClass = location.pathname.split('/')[2];

  useEffect(() => {
    const getClassParticipants = async (id) => {
      const dataRespond = await getClassroomParticipant(id);
      console.log('Data respond', dataRespond);
      setClassParticipants(dataRespond.data.data);
    };

    getClassParticipants(idClass);
  }, [idClass]);

  const listTeachers = classParticipants?.filter((item) => item.role === 'teacher') || [];
  const listStudents = classParticipants?.filter((item) => item.role === 'student') || [];
  const listStudentsExportExcel = listStudents.map((student) => {
    const resultStudent = {
      fullname: student.name,
      email: student.email,
      role: student.role,
    };

    return resultStudent;
  });

  const handleInviteByEmail = async () => {
    try {
      const { data: response } = await inviteClassroom({ email, classroom: idClass });
      console.log(response);
      openNotification({ type: 'success', title: 'Thêm thành viên', description: 'Thêm thành viên mới thành công' });
      setOpenInviteModal(false);
      if (response.data.inviteUser) {
        setClassParticipants([...classParticipants, response.data.inviteUser]);
      }
    } catch (err) {
      console.log(err);
      openNotification({ type: 'error', title: 'Thêm thành viên', description: 'Thêm thành viên mới thất bại' });
      setOpenInviteModal(false);
    }
  };

  return (
    <div>
      <SubMenu></SubMenu>
      <ExcelExportButton
        data={listStudentsExportExcel}
        fileName="DanhSachLop"
        sheetName="Data"
        buttonName="Download danh sách lớp (.xlsx)"
      />
      <div>
        {isTeacher && <Button onClick={() => setOpenInviteModal(true)}>+ Thêm thành viên mới</Button>}
        <InviteModal
          open={openInviteModal}
          onCancel={() => setOpenInviteModal(false)}
          onOk={handleInviteByEmail}
          onInputValueChange={(value) => setEmail(value)}
        />
      </div>
      <h2>Giáo viên</h2>
      <List
        dataSource={listTeachers}
        renderItem={(teacher) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={teacher.name}
              description={teacher.email}
            />
          </List.Item>
        )}
      />

      <h2>Học viên</h2>
      <List
        dataSource={listStudents}
        renderItem={(student) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={student.name}
              description={student.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
