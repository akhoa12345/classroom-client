import { useContext, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Button, Form, Input } from 'antd';

import AuthContext from '../../contexts/auth/auth-context';
import { updateProfile } from '../../services/auth';

import '../../css/userProfileStyle.css';

export default function UserProfile() {
  //const navigate = useNavigate();
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false)
  const { user, setUser } = useContext(AuthContext);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleUserProfile = async () => {
    try {
      const data = form.getFieldValue();
      const dataCallAPI = {
        name: data.fullname,
        phone: data.telephone,
        address: data.address,
      };
      console.log('AloAlo123: ', dataCallAPI);
      setError(null);
      //setLoading(true)
      const dataReturn = await updateProfile(dataCallAPI);
      //setLoading(false)
      console.log('API Response: ', dataReturn);

      const dataUser = dataReturn.data.data;
      const status = dataReturn.data.status;

      console.log('Status: ', status);
      console.log('User information: ', dataUser);

      if (status == 'success') {
        setUser(dataUser);
      }
      // form.submit();
    } catch (error) {
      setError('Cập nhật không thành công');
      //setLoading(false)
    }
  };

  const [form] = Form.useForm();

  return (
    <div className="user-profile">
      <div className="title-user-profile">Cập nhật thông tin cá nhân</div>
      <Form
        form={form}
        name="normal_user-profile"
        className="user-profile-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          email: user.email,
          idMapping: user.idMapping,
          fullname: user.name,
          telephone: user.phone,
          address: user.address,
        }}
        onFinish={onFinish}
      >
        <Form.Item label="Email" name="email">
          <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} readOnly value={user.email} />
        </Form.Item>

        {user.role == 'student' && (
          <Form.Item label="ID Mapping" name="idMapping">
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              readOnly
              value={user.idMapping}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Fullname"
          name="fullname"
          rules={[
            {
              required: true,
              message: 'Please input your fullname!',
            },
          ]}
        >
          <Input size="large" placeholder="Enter fullname" />
        </Form.Item>

        <Form.Item
          label="Telephone"
          name="telephone"
          rules={[
            {
              required: true,
              message: 'Please input your telephone!',
            },
          ]}
        >
          <Input size="large" placeholder="Enter telephone" type="tel" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input size="large" placeholder="Enter address" />
        </Form.Item>

        {error && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Typography.Text type="danger">{error}</Typography.Text>
          </Form.Item>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="user-profile-form-button" onClick={handleUserProfile}>
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
