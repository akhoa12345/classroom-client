import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';
import { Card } from 'antd';
// import  DotSvg  from '/img/dot.svg?url';
import styled from 'styled-components';

import { getUserNotification, patchSeenNotification } from '../../services/notification';

const DotSvg = createFromIconfontCN({
  scriptUrl: '/img/dot.svg',
});

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notification = async () => {
      const dataRespond = await getUserNotification();
      console.log('User notification Data respond', dataRespond);
      setNotifications(dataRespond.data.data);
    };

    notification();
  }, []);

  const handleClick = async (notificationId) => {
    const data = {
      new: false,
    };
    await patchSeenNotification(notificationId, data);
  };

  console.log('Notification: ', notifications);
  return (
    <NotificationsStyle>
      <h1>Thông báo</h1>
      {notifications.map((notification) => {
        // format date
        const createdAtDate = new Date(notification.createdAt);
        const formattedDate = createdAtDate.toISOString().split('T')[0];
        const time = createdAtDate.toISOString().split('T')[1];
        const formattedTime = time.split('.')[0];

        // switch case content
        let text;
        switch (notification.type) {
          case 'DECIDED_GRADE_REVIEW':
            text = 'đã quyết định về điểm phúc khảo của bạn';
            break;
          case 'NEW_GRADE_REVIEW':
            text = 'đã tạo đơn phúc khảo';
            break;
          case 'REPLY_GRADE_REVIEW':
            text = 'đã phản hồi bình luận của bạn';
            break;
          case 'FINALIZE_GRADE':
            text = 'đã finalize grade';
            break;
          default:
            break;
        }

        return (
          <CardStyle
            className={`list-item ${!notification.new ? 'read' : ''}`}
            key={notification.id}
            onClick={() => handleClick(notification.id)}
          >
            <Link to={notification.redirect}>
              <div className="list-content">
                <div className="info">
                  <strong>{notification.from.name}</strong> {text} trong lớp {notification.classroom.name}
                  <p>
                    {formattedDate} <span>{formattedTime}</span>
                  </p>
                </div>
                {notification.new && <DotSvg className="icon" type="icon-example" />}
              </div>
            </Link>
          </CardStyle>
        );
      })}
    </NotificationsStyle>
  );
}

export default Notifications;

const NotificationsStyle = styled.div`
  .list-item {
    &:hover {
      cursor: pointer;
      background-color: #f2f2f2;
    }
    a {
      color: black;
      width: 100%;
      display: block;
      padding: 16px;

      .list-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          margin: 0;
          font-size: 12px;
        }

        .icon {
          background-color: #0866ff;
          width: 12px;
          height: 12px;
          border-radius: 100%;
        }
      }
    }
    &.read {
      .list-content {
        opacity: 0.5;
      }
    }
  }
`;

const CardStyle = styled(Card)`
  border: none;
  & .ant-card-body {
    padding: 0px;
  }
`;
