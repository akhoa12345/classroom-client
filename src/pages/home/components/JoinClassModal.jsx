import { Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const JoinClassModal = ({ open, onCancel, onOk, onInputValueChange }) => {
  return (
    <Modal title="Tham gia bằng mã lớp học" open={open} onCancel={onCancel} onOk={onOk}>
      <Input placeholder="Nhập mã" onChange={(e) => onInputValueChange(e.target.value)} />
    </Modal>
  );
};

JoinClassModal.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  onInputValueChange: PropTypes.func,
};

export default JoinClassModal;
