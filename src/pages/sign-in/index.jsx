import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FacebookOutlined, GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Typography } from 'antd';

import SubmitButton from '../../components/ui/SubmitButton';
import AuthContext from '../../contexts/auth/auth-context';
import { APP_CONFIGS } from '../../libs/constants/appConfig';
import { setJwt } from '../../libs/utils/localStorage';
import { signIn } from '../../services/auth';

import '../../css/signinStyle.css';

export default function SignIn() {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state: locationState } = useLocation();
  // const [searchParams] = useSearchParams();
  // const countinue = searchParams.get('countinue');

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleSignIn = async () => {
    try {
      const data = form.getFieldValue();
      const dataCallAPI = {
        email: data.email,
        password: data.password,
      };
      setLoading(true);
      const dataReturn = await signIn(dataCallAPI);
      setLoading(false);
      const dataUser = dataReturn.data;

      const token = dataUser.token;
      console.log(dataUser);

      if (dataUser.status == 'success') {
        setUser(dataUser.data.user);
        setJwt(token);
        if (locationState.redirect) {
          navigate(locationState.redirect);
        } else {
          navigate('/home');
        }
      }

      form.submit();
    } catch (error) {
      setError('Sai tài khoản hoặc mật khẩu');
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  return (
    <div className="signin">
      <div className="title-signin">Đăng nhập</div>
      <Form
        form={form}
        name="normal_signin"
        className="signin-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
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

        {error && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Typography.Text type="danger" style={{ fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {error}
            </Typography.Text>
          </Form.Item>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Link to="/accept-send-email" style={{ fontSize: '16px' }}>
            Quên mật khẩu
          </Link>
          <SubmitButton
            form={form}
            type="primary"
            htmlType="submit"
            className="signin-form-button"
            onClick={handleSignIn}
            loading={loading}
          >
            Đăng nhập
          </SubmitButton>
          Or{' '}
          <Link to="/sign-up" style={{ fontSize: '16px' }}>
            register now!
          </Link>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Flex vertical>
            <a href={`${APP_CONFIGS.API_URL}/auth/login/facebook`}>
              <Button
                icon={<FacebookOutlined />}
                style={{ background: '#3b5998', color: 'white', maxWidth: '250px', margin: '8px' }}
              >
                Đăng nhập bằng Facebook
              </Button>
            </a>

            <a href={`${APP_CONFIGS.API_URL}/auth/login/google`}>
              <Button
                icon={<GoogleOutlined />}
                style={{ background: '#dd4b39', color: 'white', maxWidth: '250px', margin: '8px' }}
              >
                Đăng nhập bằng Google
              </Button>
            </a>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
}
