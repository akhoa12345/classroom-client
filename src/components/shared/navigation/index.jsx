import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';

const Navigation = () => {
  return (
    <div>
      <Avatar size="small" icon={<UserOutlined />} />
      <Button>Sign out</Button>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      <ul>
        <li>
          <Link to="/sign-in">Sign in</Link>
        </li>
        <li>
          <Link to="/">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign up</Link>
        </li>
        <li>
          <Link to="/user-profile">User Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
