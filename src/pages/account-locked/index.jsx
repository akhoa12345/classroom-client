import { Navigate } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import { Card, Descriptions, Typography } from 'antd';

import useAuth from '../../hooks/useAuth';
const AccountLocked = () => {
  const { user } = useAuth();
  if (!user?.isLocked) return <Navigate to="/" />;
  return (
    <Card style={{ textAlign: 'center', padding: '20px' }}>
      <LockOutlined style={{ fontSize: '48px', margin: '20px' }} />
      <Typography.Title level={2}>Tài khoản đã bị khóa</Typography.Title>
      <Descriptions size="small" column={1}>
        <Descriptions.Item label="Liên hệ:">Hãy liên hệ với Admin để yêu cầu mở khóa</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default AccountLocked;
