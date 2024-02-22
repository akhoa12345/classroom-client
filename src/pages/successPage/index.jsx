import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Card, Space, Typography } from 'antd';

import { setJwt } from '../../libs/utils/localStorage';
import { verify } from '../../services/auth';

const LoginSuccess = () => {
  const [searchParams] = useSearchParams();
  const verifyToken = searchParams.get('token');

  useEffect(() => {
    // const userToken= getMe();
    // // Set the token in local storage
    // setJwt(userToken.token);

    // Send the token to the backend using Axios
    try {
      const response = verify(verifyToken);
      response
        .then((response) => {
          console.log('Response from backend:', response.data);
          setJwt(response.data.token);
        })
        .catch((error) => {
          console.error('Error sending token to backend:', error);
        });
    } catch (error) {
      console.log(error);
    }
    // Redirect the user to the home page
    // window.location.href = "/";
  }, [verifyToken]);

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '200px',
      }}
    >
      <Typography.Title>Advance Web Classroom</Typography.Title>
      <Card
        title="Kích hoạt tài khoản thành công"
        size="small"
        align="center"
        style={{
          width: 600,
        }}
      >
        <Button type="primary">
          <a href="/">Trang chủ</a>
        </Button>
      </Card>
    </Space>
  );
};

export default LoginSuccess;
