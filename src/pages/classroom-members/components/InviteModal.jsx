import { Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const InviteModal = ({ open, onCancel, onOk, onInputValueChange }) => {
  return (
    <Modal title="Thêm thành viên" open={open} onCancel={onCancel} onOk={onOk}>
      <Input placeholder="Nhập email" onChange={(e) => onInputValueChange(e.target.value)} />
    </Modal>
  );
};

InviteModal.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  onInputValueChange: PropTypes.func,
};

export default InviteModal;
