import React from "react";
import { Button, Form } from "antd";
import PropTypes from "prop-types";

const SubmitButton = ({ form, ...other }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values, form]);

  return <Button {...other} disabled={!submittable}></Button>;
};

SubmitButton.propTypes = {
  form: PropTypes.object,
};

export default SubmitButton;
