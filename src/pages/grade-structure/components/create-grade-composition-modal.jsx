import { Form, Input, InputNumber, Modal } from 'antd';
import PropTypes from 'prop-types';

function CreateGradeCompositionModal({ open, onCancel, onOk, onInputGradeCompositionNameChange, onInputScaleChange }) {
  return (
    <Modal title="Thêm cột điểm thành phần" open={open} onCancel={onCancel} onOk={onOk}>
      <Form
        name="normal_grade-modal"
        className="grade-modal-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Grade Composition"
          name="grade-composition-name"
          rules={[
            {
              required: true,
              message: 'Please input your Grade Composition Name!',
            },
          ]}
        >
          <Input placeholder="Nhập tên cột điểm" onChange={(e) => onInputGradeCompositionNameChange(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Scale"
          name="scale"
          rules={[
            {
              required: true,
              message: 'Please input your scale!',
            },
          ]}
        >
          <InputNumber min={1} max={100} defaultValue={1} onChange={(value) => onInputScaleChange(parseFloat(value))} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

CreateGradeCompositionModal.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  onInputGradeCompositionNameChange: PropTypes.func,
  onInputScaleChange: PropTypes.func,
};

export default CreateGradeCompositionModal;
