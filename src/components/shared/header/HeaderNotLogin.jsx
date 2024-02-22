import { BiPlanet } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';

const { Header } = Layout;

const HeaderNotLogin = () => {
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
        <div className="demo-logo" />

        <Menu
          className="menu"
          theme="light"
          mode="horizontal"
          style={{
            flex: 'auto',
            minWidth: 0,
          }}
        >
          <Menu.Item key="1">
            <Link to="/home">
              <p style={{ marginRight: '8px', lineHeight: '0px', padding: '0 20px' }}>
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
          <Menu.Item key="3">
            <Button>
              <Link to="/sign-in">Đăng nhập</Link>
            </Button>
          </Menu.Item>
          <Menu.Item key="4">
            <Button>
              <Link to="/sign-up">Đăng kí</Link>
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default HeaderNotLogin;
