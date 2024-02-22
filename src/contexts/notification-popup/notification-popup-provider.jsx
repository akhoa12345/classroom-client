import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';

export default function NotificationPopup({ title, message, visible, onOk, onCancel }) {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="ok" type="primary" onClick={onOk}>
          OK
        </Button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
}

NotificationPopup.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
