import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Empty, Row, Typography } from 'antd';

import CardClassroomInfo from '../../components/shared/card-classroom-info';
import NotificationContext from '../../contexts/notification/notificationContext';
import { getMyClassroom, joinClassroomByCode } from '../../services/classroom';

import JoinClassModal from './components/JoinClassModal';

const { Title } = Typography;

export default function Home() {
  const [listClassrooms, setListClassrooms] = useState([]);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const { openNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getListClassroom = async () => {
      const dataRespond = await getMyClassroom();
      setListClassrooms(dataRespond.data.data);
    };
    getListClassroom();
  }, []);

  const handleJoinClassroom = async () => {
    try {
      const { data: response } = await joinClassroomByCode(joinCode);
      const classroom = response.data;
      openNotification({ type: 'success', title: 'Tham gia lớp học', description: 'Tham gia lớp học thành công' });
      setOpenJoinModal(false);
      navigate(`/classroom/${classroom.id}`);
    } catch (err) {
      console.log(err);
      openNotification({ type: 'error', title: 'Tham gia lớp học', description: 'Tham gia lớp học thất bại' });
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenJoinModal(true)}>Tham gia lớp học</Button>
      <JoinClassModal
        open={openJoinModal}
        onCancel={() => setOpenJoinModal(false)}
        onInputValueChange={(value) => setJoinCode(value)}
        onOk={handleJoinClassroom}
      />
      {listClassrooms.length > 0 ? (
        <div>
          <Title level={2}>Lớp học của tôi</Title>
          <Row gutter={[32, 32]} justify="center">
            {listClassrooms.map((classroom) => (
              <Col style={{ marginTop: 16 }} key={classroom?.classroom?.id}>
                <Link to={`/classroom/${classroom?.classroom?.id}`}>
                  <CardClassroomInfo data={classroom?.classroom} />
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Empty description={<Title level={3}>Bạn hiện đang không tham gia lớp học nào</Title>} />
        </div>
      )}
    </div>
  );
}
