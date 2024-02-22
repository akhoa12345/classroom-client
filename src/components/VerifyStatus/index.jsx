import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { theme } from 'antd';
import { Button, Popover } from 'antd';
import PropTypes from 'prop-types';

const { useToken } = theme;

const VerifyStatus = ({ verify, onSendVerifyEmail }) => {
  const { token } = useToken();
  const title = verify ? 'Tài khoản đã kích hoạt thành công' : 'Tài khoản chưa kích hoạt';
  return (
    <Popover title={title} content={!verify && <Button onClick={onSendVerifyEmail}>Gửi email xác nhận</Button>}>
      {verify ? <FaCheckCircle color={token.colorSuccess} /> : <MdError color={token.colorError} />}
    </Popover>
  );
};

VerifyStatus.propTypes = {
  verify: PropTypes.bool,
  onSendVerifyEmail: PropTypes.func,
};

export default VerifyStatus;
