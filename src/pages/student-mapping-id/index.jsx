import { useState } from 'react';
import { Button, Form, Input, Modal, Typography } from 'antd';

import SubmitButton from '../../components/ui/SubmitButton';
import { createAndUpdateIdMapping } from '../../services/student';

import '../../css/signupStyle.css';

export default function CreateClassroom() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  //const [successClassroom, setSuccessClassroom] = useState(null);

  //const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const showSuccessMessage = () => {
    setSuccessModalVisible(true);
  };

  const handleOk = () => {
    setSuccessModalVisible(false);
    //navigate(`/classroom/${successClassroom}`);
  };

  const handleCancel = () => {
    setSuccessModalVisible(false);
  };

  const handleMappingStudentID = async () => {
    try {
      const { studentID } = form.getFieldValue();
      const dataCallAPI = {
        idMapping: studentID,
      };
      console.log('Data call API: ', dataCallAPI);

      setError(null);
      const dataRespond = await createAndUpdateIdMapping(dataCallAPI);
      setLoading(false);
      console.log('response', dataRespond);

      if (dataRespond.data.status == 'success') {
        showSuccessMessage();
        //setSuccessClassroom(dataRespond.data.data.id);
      }

      form.submit();
    } catch (error) {
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  return (
    <div className="signup">
      <div className="title-signup">Mapping mã số sinh viên</div>
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
          label="Student ID"
          name="studentID"
          rules={[
            {
              required: true,
              message: 'Please input student ID!',
            },
          ]}
        >
          <Input size="large" placeholder="Student ID" />
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
            onClick={handleMappingStudentID}
          >
            Mapping
          </SubmitButton>
        </Form.Item>
      </Form>

      <Modal
        title="Thông báo: Mapping student ID"
        visible={successModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <p>Bạn vừa mapping thành công mã số sinh viên</p>
      </Modal>
    </div>
  );
}
