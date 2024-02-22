import { useEffect, useState } from 'react';
import React, { useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Descriptions, Form, Input, notification, Popover } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SubMenu from '../../components/shared/subMenu';
import { getDetailClassroomById } from '../../services/classroom';

const ContentStyle = styled.div`
  p {
    margin: 0;
    padding: 12px;
    margin-left: -12px;
    margin-right: -12px;

    &:hover {
      background-color: #ccc;
      cursor: pointer;
    }
  }
`;

const Context = React.createContext({
  name: 'Default',
});

function Content({ code, onCopy, classroomId }) {
  const [api, contextHolder] = notification.useNotification({
    // maxCount: 1,
    stack: { threshold: 1 },
  });

  const openNotification = (placement) => {
    api.info({
      message: ``,
      description: <Context.Consumer>{() => `Đã sao chép thành công`}</Context.Consumer>,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <ContentStyle>
        <CopyToClipboard
          text={`http://localhost:3001/classroom/invite/${classroomId}?joinCode=${code.value}`}
          onCopy={onCopy}
        >
          <p onClick={() => openNotification('bottomLeft')}>Sao chép đường liên kết mời tham gia lớp học</p>
        </CopyToClipboard>

        <CopyToClipboard text={code.value} onCopy={onCopy}>
          <p onClick={() => openNotification('bottomLeft')}>Sao chép mã lớp</p>
        </CopyToClipboard>
      </ContentStyle>
    </Context.Provider>
  );
}

function ClassDetail() {
  const [detailClass, setDetailClass] = useState();
  const location = useLocation();
  const [code, setCode] = useState({
    value: '',
    copied: false,
  });
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const idClass = location.pathname.split('/').pop();

  useEffect(() => {
    const getDetailClassroom = async (id) => {
      const dataRespond = await getDetailClassroomById(id);
      setDetailClass(dataRespond.data.data);
      setCode((prevCode) => ({
        ...prevCode,
        value: dataRespond.data.data.joinCode,
      }));

      form.setFieldsValue({
        classroom: dataRespond.data.data.name,
        subject: dataRespond.data.data.subject,
        maxStudent: dataRespond.data.data.maxStudent,
        description: dataRespond.data.data.description,
      });
    };

    getDetailClassroom(idClass);
  }, [idClass, form]);

  function handleOnCopy() {
    setCode((prevCode) => ({
      ...prevCode,
      copied: true,
    }));
  }

  return (
    <ClassDetailStyle>
      <SubMenu></SubMenu>
      <Card>
        <div
          className="bg-image"
          style={{
            backgroundImage: 'url(/img/AnhNen.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '240px',
            left: 0,
            position: 'relative',
            top: '0px',
            width: '100%',
            borderRadius: '8px',
          }}
        >
          <h1
            className="course-name"
            style={{
              bottom: 0,
              color: '#fff',
              left: 0,
              padding: '1rem 1.5rem',
              position: 'absolute',
              right: 0,
            }}
          >
            {detailClass?.name}
          </h1>
        </div>

        <div className="course-info">
          <h1>Thông tin về khóa học</h1>
          <div className="course-detail">
            <div className="course-join-code-part">
              <div>
                <p className="course-join-code-title">Mã lớp:</p>
                <h4 className="course-join-code">{code.value}</h4>
              </div>
              <Popover content={<Content code={code} onCopy={handleOnCopy} classroomId={idClass} />} trigger="click">
                <MoreOutlined className="icon" />
              </Popover>
            </div>
            <Form
              form={form}
              name="normal_user-profile"
              className="user-profile-form"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, marginLeft: '8rem' }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Tên lớp học"
                name="classroom"
                rules={[
                  {
                    required: true,
                    message: 'Please input your classroom name!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter classroom name" readOnly value={detailClass?.name} />
              </Form.Item>

              <Form.Item
                label="Tên môn học"
                name="subject"
                rules={[
                  {
                    required: true,
                    message: 'Please input your subject name!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter subject name" readOnly />
              </Form.Item>

              <Form.Item
                label="Số lượng học sinh"
                name="maxStudent"
                rules={[
                  {
                    required: true,
                    message: 'Please input your number of student!',
                  },
                ]}
              >
                <Input type="number" size="large" placeholder="Enter number of student" readOnly />
              </Form.Item>

              <Form.Item
                label="Mô tả lớp học"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input your classroom description!',
                  },
                ]}
              >
                <Input.TextArea
                  size="large"
                  placeholder="Enter classroom description"
                  readOnly
                  style={{ height: 150 }}
                />
              </Form.Item>
            </Form>
          </div>
          <h1>Thông tin về giảng viên: </h1>
          <Descriptions bordered column={1} size="large">
            <Descriptions.Item label="Fullname" span={1}>
              <UserOutlined /> {detailClass?.teacher?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <MailOutlined /> {detailClass?.teacher?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              <PhoneOutlined /> {detailClass?.teacher?.phone}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </ClassDetailStyle>
  );
}

Content.propTypes = {
  code: PropTypes.object.isRequired,
  onCopy: PropTypes.func.isRequired,
  classroomId: PropTypes.string.isRequired,
};

export default ClassDetail;

const ClassDetailStyle = styled.div`
  .bg-image {
    background-image: url(/img/AnhNen.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    height: 240px;
    left: 0;
    position: relative;
    top: 0px;
    width: 100%;
    border-radius: 8px;
    .course-name {
      bottom: 0;
      color: #fff;
      left: 0;
      padding: 1rem 1.5rem;
      position: absolute;
      right: 0;
    }
  }
  .course-detail {
    display: flex;
    .course-join-code-part {
      height: 6rem;
      width: 14rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border: 1px solid #ccc;
      border-radius: 1rem;
      .course-join-code-title {
        margin: 0;
      }
      .course-join-code {
        margin: 0;
        font-size: 24px;
        color: rgb(25, 103, 210);
        fill: rgb(25, 103, 210);
        font-weight: 500;
      }
      .icon {
        font-size: 30px;
        padding: 8px;
        border-radius: 50%;
        &:hover {
          background-color: #ccc;
        }
      }
    }
    .user-profile-form {
      max-width: 600;
      margin-left: 8rem;
    }
  }
`;
