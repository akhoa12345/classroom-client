import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Popover, Radio, Typography } from 'antd';

import SubmitButton from '../../components/ui/SubmitButton';
import AuthContext from '../../contexts/auth/auth-context';
import { setJwt } from '../../libs/utils/localStorage';
import { signUp } from '../../services/auth';

import '../../css/signupStyle.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleSignUp = async () => {
    try {
      const { fullname, email, password, confirmPassword, telephone, address, role } = form.getFieldValue();
      const dataCallAPI = {
        name: fullname,
        email,
        password,
        confirmPassword,
        phone: telephone,
        address,
        role,
      };
      console.log(dataCallAPI);

      setError(null);
      setLoading(true);
      const dataReturn = await signUp(dataCallAPI);
      const dataUser = dataReturn.data;
      const token = dataUser.token;

      if (dataUser.status == 'success') {
        setUser(dataUser.data.user);
        setJwt(token);
        navigate('/home');
      }
      setLoading(false);
    } catch (error) {
      console.log('error');
      setError('Email đã tồn tại');
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  return (
    <div className="signup">
      <div className="title-signup">Đăng ký</div>
      <Form
        form={form}
        name="normal_signup"
        className="signup-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
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
          <Input size="large" placeholder="Fullname" />
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
          <Input size="large" placeholder="Telephone" type="tel" />
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
          <Input size="large" placeholder="Address" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please input your Confirm Password!',
            },
            {
              validator: (_, value) => {
                if (!value || form.getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            },
          ]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Radio.Group defaultValue="student">
            <Radio.Button value="student">Student</Radio.Button>
            <Radio.Button value="teacher">Teacher</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {error && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Typography.Text type="danger">{error}</Typography.Text>
          </Form.Item>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Popover title="Mời bạn check email" trigger="click" open={open} onOpenChange={handleOpenChange}>
            <SubmitButton
              form={form}
              type="primary"
              loading={loading}
              htmlType="submit"
              className="signup-form-button"
              onClick={handleSignUp}
            >
              Đăng kí
            </SubmitButton>
          </Popover>
          Or{' '}
          <Link to="/sign-in" style={{ fontSize: '16px' }}>
            log in now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
