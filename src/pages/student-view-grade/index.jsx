import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, Input, Modal, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Typography from 'antd/es/typography/Typography';

import SubMenu from '../../components/shared/subMenu';
import NotificationContext from '../../contexts/notification/notificationContext';
import { getDetailClassroomById } from '../../services/classroom';
import { getStudentGrade, postGradeReview } from '../../services/grade';
import { notifyAnotherUserInClassroom } from '../../services/notification';

function StudentViewGrade() {
  const [studentGrade, setStudentGrade] = useState();
  const [modaldata, setmodaldata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openNotification } = useContext(NotificationContext);

  const location = useLocation();

  const idClass = location.pathname.split('/')[2];

  useEffect(() => {
    const studentGrade = async (id) => {
      const dataRespond = await getStudentGrade(id);

      setStudentGrade(dataRespond.data.data);
    };

    studentGrade(idClass);
  }, [idClass]);

  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Success:', values);
  };

  const handleSubmit = async () => {
    try {
      const data = form.getFieldValue();
      const dataCallAPI = {
        studentGrade: data.studentGrade,
        expectationGrade: data.expectationGrade,
        reason: data.reason,
      };
      console.log('Đơn phúc khảo: ', dataCallAPI);
      // setError(null);
      //setLoading(true)
      const dataReturn = await postGradeReview(dataCallAPI);
      //setLoading(false)
      const dataUser = dataReturn.data.data;
      const status = dataReturn.data.status;

      if (status == 'success') {
        openNotification({
          type: 'success',
          title: 'Tạo phúc khảo',
          description: 'Gửi đơn phúc khảo thành công',
        });
        setIsModalOpen(false);

        // Call API to get detail classroom to take the teacher ID
        const dataClassDetailResponse = await getDetailClassroomById(idClass);
        const dataClassroomDetail = dataClassDetailResponse.data.data;

        // Call API to post Notify another user in classroom
        const sendDataNotify = {
          to: dataClassroomDetail.teacher._id,
          type: 'NEW_GRADE_REVIEW',
          redirect: `/classroom/${idClass}/grade-review/${dataUser.id}`,
        };
        const dataNotify = await notifyAnotherUserInClassroom(idClass, sendDataNotify);
        console.log('dataNotify Response: ', dataNotify);
      }
      // form.submit();
    } catch (error) {
      openNotification({
        type: 'error',
        title: 'Tạo phúc khảo',
        description: 'Gửi đơn phúc khảo thất bại',
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Thành phần điểm',
      key: 'scorePart',
      dataIndex: 'scorePart',
    },
    {
      title: 'Hệ số điểm',
      key: 'percentScore',
      dataIndex: 'percentScore',
    },
    {
      title: 'Số điểm',
      key: 'score',
      dataIndex: 'score',
    },
    {
      title: 'Phúc khảo',
      dataIndex: 'action',
      key: 'x',
      render: (_, record) => {
        console.log(record);
        return (
          <>
            <Button onClick={() => showModal(record)}>Phúc khảo</Button>
          </>
        );
      },
    },
  ];

  let row =
    studentGrade?.grades.map((grade) => {
      return {
        scoreId: grade._id,
        scorePart: grade.structureGrade?.name,
        percentScore: grade.structureGrade?.scale,
        score: grade.grade,
      };
    }) ?? [];
  const data = [...row];

  return (
    <>
      <SubMenu />
      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={data}
        footer={() => <Typography.Text>Tổng điểm: {studentGrade?.total}</Typography.Text>}
      />
      <Modal title="Đơn phúc khảo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          initialValues={{ scorePart: modaldata.scorePart, score: modaldata.score, studentGrade: modaldata.scoreId }}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Cột điểm phúc khảo"
            name="scorePart"
            rules={[
              {
                message: 'Please input your cột điểm!',
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item label="Điểm hiện tại" name="score">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Điểm kì vọng"
            name="expectationGrade"
            rules={[
              {
                required: true,
                message: 'Please input your expectation grade!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lí do"
            name="reason"
            rules={[
              {
                required: true,
                message: 'Please input your reason!',
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default StudentViewGrade;
