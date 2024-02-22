import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

const ExcelExportButton = ({ data, fileName, sheetName, buttonName }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Sheet1');
    XLSX.writeFile(workbook, `${fileName || 'ExportedData'}.xlsx`);
  };

  return (
    <CSSExcelExportButton>
      <Button type="primary" onClick={exportToExcel}>
        <DownloadOutlined /> {buttonName}
      </Button>
    </CSSExcelExportButton>
  );
};

export default ExcelExportButton;

const CSSExcelExportButton = styled.div`
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 16px;
  margin-bottom: 16px;
`;

ExcelExportButton.propTypes = {
  data: PropTypes.object,
  fileName: PropTypes.string,
  sheetName: PropTypes.string,
  buttonName: PropTypes.string,
};
