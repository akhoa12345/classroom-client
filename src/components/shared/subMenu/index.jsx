import { Link, useLocation, useParams } from 'react-router-dom';
import { Menu } from 'antd';

import useAuth from '../../../hooks/useAuth';

function SubMenu() {
  const { id } = useParams();
  const { isTeacher } = useAuth();
  const location = useLocation();

  const { pathname } = location;

  //const selectedKey = pathname.includes('participants') ? '2' : pathname.includes('grade-structure') ? '3' : '1';
  var selectedKey;

  switch (true) {
    case pathname.includes('participants'):
      selectedKey = '2';
      break;
    case pathname.includes('grade-structure'):
      selectedKey = '3';
      break;
    case pathname.includes('grade-board'):
      selectedKey = '4';
      break;
    case pathname.includes('grade-review'):
      selectedKey = '5';
      break;
    case pathname.includes('studentGrade'):
      selectedKey = '6';
      break;
    case pathname.includes('upload-grade-file'):
      selectedKey = '7';
      break;
    case pathname.includes('import-excel-list-student'):
      selectedKey = '8';
      break;
    default:
      selectedKey = '1';
  }

  console.log('selected key: ', selectedKey);

  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      selectedKeys={[selectedKey]}
      style={{
        marginBottom: '10px',
      }}
    >
      <Menu.Item key="1">
        <Link to={`/classroom/${id}`}>Thông tin lớp học</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/classroom/${id}/participants`}>Mọi người</Link>
      </Menu.Item>

      {isTeacher && (
        <Menu.Item key="3">
          <Link to={`/classroom/${id}/grade-structure`}>Cấu trúc điểm</Link>
        </Menu.Item>
      )}
      {isTeacher && (
        <Menu.Item key="4">
          <Link to={`/classroom/${id}/grade-board`}>Bảng điểm</Link>
        </Menu.Item>
      )}
      {
        <Menu.Item key="5">
          <Link to={`/classroom/${id}/grade-review`}>Phúc khảo</Link>
        </Menu.Item>
      }
      {!isTeacher && (
        <Menu.Item key="6">
          <Link to={`/classroom/${id}/studentGrade`}>Điểm</Link>
        </Menu.Item>
      )}
      {isTeacher && (
        <Menu.Item key="7">
          <Link to={`/classroom/${id}/upload-grade-file`}>Upload file điểm</Link>
        </Menu.Item>
      )}
      {isTeacher && (
        <Menu.Item key="8">
          <Link to={`/classroom/${id}/import-excel-list-student`}>Import danh sách lớp</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default SubMenu;
