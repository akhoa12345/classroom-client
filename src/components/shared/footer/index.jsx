import { FacebookOutlined, GoogleOutlined, InstagramOutlined, MailOutlined, TwitterOutlined } from '@ant-design/icons';
import { Col, Layout, Row } from 'antd';

const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer style={{ backgroundColor: '#87CEFA', color: '#808080' }}>
      <Row justify="space-around" align="top">
        <Col span={6}>
          <h2>Kết nối với chúng tôi</h2>
          <div>
            <FacebookOutlined style={{ fontSize: '24px', marginRight: '5px' }} />
            <GoogleOutlined style={{ fontSize: '24px', marginRight: '5px' }} />
            <InstagramOutlined style={{ fontSize: '24px', marginRight: '5px' }} />
            <TwitterOutlined style={{ fontSize: '24px', marginRight: '5px' }} />
          </div>
        </Col>
        <Col span={6}>
          <h2>Liên hệ với chúng tôi</h2>
          <div>
            <MailOutlined style={{ fontSize: '24px', marginRight: '8px', textAlign: 'center' }} />
            nhom5@gmail.com
          </div>
          <div>Khoa Công nghệ Thông tin</div>
          <div>Trường Đại học Khoa học Tự nhiên</div>
        </Col>
        <Col span={6}>
          <h2>Copyright @ 2023</h2>
          <div>Phát triển ứng dụng web nâng cao - Team </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default MyFooter;
