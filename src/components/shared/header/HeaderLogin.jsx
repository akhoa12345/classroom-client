import { useContext, useState } from 'react';
import { BiPlanet } from 'react-icons/bi';
import { Link, Outlet } from 'react-router-dom';
import {
  BellOutlined,
  HeatMapOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Card, Flex, Layout, Menu } from 'antd';

import AuthContext from '../../../contexts/auth/auth-context';
import NotificationContext from '../../../contexts/notification/notificationContext';
import useAuth from '../../../hooks/useAuth';
import { logOut, sendVerifyEmail } from '../../../services/auth';
import VerifyStatus from '../../VerifyStatus';

const { Header, Sider, Content } = Layout;

const HeaderLogin = () => {
  const { setUser } = useContext(AuthContext);
  const { user, isTeacher } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const { openNotification } = useContext(NotificationContext);

  const handleSendVerifyEmail = async () => {
    try {
      await sendVerifyEmail();
      openNotification({
        type: 'success',
        title: 'Kích hoạt tài khoản',
        description: 'Đã gửi email kích hoạt tài khoản',
      });
    } catch (err) {
      console.log(err);
      openNotification({
        type: 'error',
        title: 'Kích hoạt tài khoản',
        description: 'Gửi email kích hoạt tài khoản thất bại',
      });
    }
  };

  return (
    <Layout
      style={{
        marginBottom: '10px',
      }}
      className="layout"
    >
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0px',
          boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            backgroundColor: 'white',
            borderRadius: 0,
            borderBottom: '1px solid #f0f0f0',
            borderTop: '1px solid rgba(0, 0, 0, 0.88)',
          }}
        />
        <div className="demo-logo" />

        {/* Left-aligned menu items */}
        <Menu
          className="menu"
          theme="light"
          mode="horizontal"
          // defaultSelectedKeys={['1']}
          style={{
            flex: 'auto',
            minWidth: 0,
          }}
        >
          <Menu.Item key="1">
            <Link to="/">
              <p style={{ marginRight: '8px', lineHeight: '0px', padding: '0 20px' }}>
                {' '}
                {/* Adjust margin as needed */}
                <BiPlanet size={35} />
              </p>
            </Link>
          </Menu.Item>
        </Menu>

        <Menu
          theme="light"
          mode="horizontal"
          // defaultSelectedKeys={['1']}
          style={{
            flex: 'auto',
            minWidth: 0,
            justifyContent: 'flex-end',
          }}
        >
          <Menu.Item
            key="2"
            style={{
              cursor: 'initial', // Set the cursor to 'initial' to remove the pointer
            }}
            onClick={(e) => e.preventDefault()}
          >
            <Flex align="center" gap={4}>
              <span>
                Xin chào, {user.role === 'student' ? 'Học viên' : 'Giáo viên'} {user.name}
              </span>
              <VerifyStatus verify={user.verify} onSendVerifyEmail={handleSendVerifyEmail} />
            </Flex>
          </Menu.Item>
          <Menu.Item key="3" onClick={(e) => e.preventDefault()}>
            <Button
              onClick={async () => {
                setUser(null);
                await logOut();
                localStorage.removeItem('jwt');
              }}
            >
              <a>Đăng xuất</a>
            </Button>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{}}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              backgroundColor: 'white',
              border: '1px solid #f0f0f0',
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['4']}
              style={{
                border: 0,
              }}
            >
              <Menu.Item key="4" icon={<VideoCameraOutlined />}>
                <Link to="/home">Home</Link>
              </Menu.Item>
              {isTeacher && (
                <Menu.Item key="6" icon={<PlusCircleOutlined />}>
                  <Link to="/create-classroom">Tạo lớp học</Link>
                </Menu.Item>
              )}
              <Menu.Item key="7" icon={<BellOutlined />}>
                <Link to="/notifications">Notifications</Link>
              </Menu.Item>
              {!isTeacher && (
                <Menu.Item key="8" icon={<HeatMapOutlined />}>
                  <Link to="/student-mapping-id">Mapping mã số sinh viên</Link>
                </Menu.Item>
              )}
              <Menu.Item key="5" icon={<UploadOutlined />}>
                <Link to="/user-profile">Thông tin cá nhân</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Card
            style={{
              width: '100%',
              borderRadius: '0',
            }}
          >
            <Outlet />
          </Card>
        </Layout>
      </Content>
    </Layout>
  );
};

export default HeaderLogin;
