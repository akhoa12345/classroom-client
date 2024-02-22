import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Modal, Typography } from 'antd';

import SubmitButton from '../../components/ui/SubmitButton';
import { createClassroom } from '../../services/classroom';

import '../../css/signupStyle.css';

export default function CreateClassroom() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successClassroom, setSuccessClassroom] = useState(null);

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const showSuccessMessage = () => {
    setSuccessModalVisible(true);
  };

  const handleOk = () => {
    setSuccessModalVisible(false);
    navigate(`/classroom/${successClassroom}`);
  };

  const handleCancel = () => {
    setSuccessModalVisible(false);
  };

  const handleCreateClassroom = async () => {
    try {
      const { classroomName, subjectName, maxStudent, description } = form.getFieldValue();
      const dataCallAPI = {
        name: classroomName,
        subject: subjectName,
        maxStudent: maxStudent,
        description: description,
      };

      setError(null);
      const dataRespond = await createClassroom(dataCallAPI);
      setLoading(false);
      console.log('response', dataRespond);

      if (dataRespond.data.status == 'success') {
        showSuccessMessage();
        setSuccessClassroom(dataRespond.data.data.id);
      }

      form.submit();
    } catch (error) {
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  return (
    <div className="signup">
      <div className="title-signup">Tạo lớp học</div>
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
          label="Classroom Name"
          name="classroomName"
          rules={[
            {
              required: true,
              message: 'Please input classroom name!',
            },
          ]}
        >
          <Input size="large" placeholder="Classroom Name" />
        </Form.Item>

        <Form.Item
          label="Subject Name"
          name="subjectName"
          rules={[
            {
              required: true,
              message: 'Please input subject name!',
            },
          ]}
        >
          <Input size="large" placeholder="Subject Name" />
        </Form.Item>

        <Form.Item
          label="Maximum students"
          name="maxStudent"
          rules={[
            {
              required: true,
              message: 'Please input your maximum number of student for classroom!',
            },
          ]}
        >
          <InputNumber size="large" min={1} max={10000} defaultValue={1} />
        </Form.Item>

        <Form.Item
          label="Classroom Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your description for classroom!',
            },
          ]}
        >
          <Input.TextArea size="large" placeholder="Classroom description" style={{ height: 150 }} />
        </Form.Item>

        {error && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Typography.Text type="danger">{error}</Typography.Text>
          </Form.Item>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <SubmitButton
            form={form}
            type="primary"
            loading={loading}
            htmlType="submit"
            className="signup-form-button"
            onClick={handleCreateClassroom}
          >
            Tạo lớp học
          </SubmitButton>
        </Form.Item>
      </Form>

      <Modal
        title="Thông báo: Tạo lớp học"
        visible={successModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <p>Bạn vừa tạo lớp học mới thành công</p>
      </Modal>
    </div>
  );
}
