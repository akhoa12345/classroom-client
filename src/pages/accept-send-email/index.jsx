import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Typography } from 'antd';

import SubmitButton from '../../components/ui/SubmitButton';
import { acceptSendEmail } from '../../services/auth';

import '../../css/acceptSendEmailStyle.css';

export default function AcceptToSentEmailResetPassword() {
  const [loading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleAcceptToSendEmail = async () => {
    try {
      // Get the email from the form
      const data = await form.getFieldValue();
      await acceptSendEmail(data);

      // Optionally, you can perform additional actions after the email is sent
      setSuccess(true);
      setError(false);
    } catch (error) {
      setError('Thông tin email không chính xác');
    }
  };

  return (
    <div className="accept-send-email">
      <div className="title-accept-send-email">Lấy lại mật khẩu</div>
      <div className="container-accept-send-email">
        <div className="content-accept-send-email">
          Vui lòng nhập email mà bạn đã đăng kí tài khoản với hệ thống của chúng tôi
        </div>
      </div>
      <Form
        form={form}
        name="normal_accept-send-email"
        className="accept-send-email-form"
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

        {error && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Typography.Text type="danger">{error}</Typography.Text>
          </Form.Item>
        )}
        {success && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Typography.Text type="success">Gửi email xác nhận thành công</Typography.Text>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <SubmitButton
            form={form}
            type="primary"
            loading={loading}
            htmlType="submit"
            className="accept-send-email-form-button"
            onClick={handleAcceptToSendEmail}
          >
            Gửi email xác nhận
          </SubmitButton>
        </Form.Item>
      </Form>
    </div>
  );
}
