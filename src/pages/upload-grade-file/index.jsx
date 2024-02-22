import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Table, Upload } from 'antd';
import * as XLSX from 'xlsx';

import SubMenu from '../../components/shared/subMenu';
import { createAndUpdateGrade, getAllStudentGradeInClassroom, getStructureGrade } from '../../services/grade';

function UploadGradeFile() {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const location = useLocation();
  console.log('Location: ', location);

  const idClass = location.pathname.split('/')[2];
  console.log('ID Class: ', idClass);

  useEffect(() => {
    const showExcelFile = async () => {
      if (excelFile !== null) {
        try {
          // Read Excel file and convert to JSON
          const workbook = XLSX.read(excelFile, { type: 'buffer' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);

          // Set the Excel data to state
          setExcelData(data.slice(0));
        } catch (error) {
          console.error('Error reading Excel file:', error);
        }
      } else {
        console.log('In ra khong thanh cong');
      }
    };

    showExcelFile();
  }, [excelFile]);

  const uploadChanged = (e) => {
    let fileTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ];
    let selectedFile = e.fileList[0].originFileObj;
    console.log(selectedFile);
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
      console.log('Ktra excel file: ', excelFile);
    } else {
      console.log('Please select your file');
    }
  };

  const handleFileSubmit = async () => {
    console.log('Excel Data trước: ', excelData);

    // API get structure grade
    const dataGradeStructureResponse = await getStructureGrade(idClass);
    console.log('structure grade Response: ', dataGradeStructureResponse);
    const dataGradeStructure = dataGradeStructureResponse.data.data;
    console.log('structure grade: ', dataGradeStructure);

    // API get all student grade in classroom
    const dataAllStudentGradeResponse = await getAllStudentGradeInClassroom(idClass);
    console.log('all student grade in classroom Response: ', dataAllStudentGradeResponse);
    const dataAllStudentGrade = dataAllStudentGradeResponse.data.data;
    console.log('all student grade in classroom: ', dataAllStudentGrade);

    // Transform data
    // join excel data and grade structure
    const resultArray = excelData.map((gradeObj) => {
      const result = {};
      Object.entries(gradeObj).forEach(([key, value]) => {
        const matchingStructureGrade = dataGradeStructure.find((structureGrade) => {
          return key.includes(structureGrade.name);
        });
        if (matchingStructureGrade) {
          result[matchingStructureGrade._id] = value;
        }
      });
      return {
        ...gradeObj,
        ...result,
      };
    });

    console.log('resultArray: ', resultArray);

    // transform dataAllStudentGrade
    const transformedData = dataAllStudentGrade.flatMap((student) => {
      // Map and transform properties as needed
      return student?.grades?.map((grade) => {
        return {
          'Họ tên': student.studentInfo.name,
          student: student?.studentInfo?._id,
          structureGrade: grade?.structureGrade,
        };
      });
    });

    console.log('Transform data: ', transformedData);

    // join resultArray and transformedData
    const formData = transformedData?.map((item) => {
      const structureGrade = item?.structureGrade;
      const student = item?.student;

      const grade = resultArray.find((entry) => entry['Họ tên'] === item['Họ tên'])[structureGrade];

      return {
        structureGrade,
        student,
        grade,
      };
    });

    console.log('formData', formData);

    // post data to server
    formData?.map(async (form) => {
      try {
        const sendAPI = await createAndUpdateGrade(form);
        console.log('Data sendAPI response: ', sendAPI);
      } catch (error) {
        console.log('Send API fail');
      }
    });
  };

  const columns =
    excelData &&
    Object.keys(excelData[0]).map((key) => {
      return {
        title: key,
        dataIndex: key,
        key: key,
      };
    });

  const dataSource = excelData?.map((individualExcelData, index) => {
    const data = {};
    Object.keys(individualExcelData).map((key) => {
      data[key] = individualExcelData[key];
    });
    return { key: index.toString(), ...data };
  });

  return (
    <>
      <SubMenu></SubMenu>
      <Upload
        name="file"
        showUploadList={{ showRemoveIcon: true }}
        accept=".csv, .xls, .xlsx"
        beforeUpload={() => false}
        onChange={(e) => uploadChanged(e)}
        // onRemove={(e) => fileRemoved(e)}
        maxCount={1}
      >
        <Button type="primary" icon={<UploadOutlined />}>
          Click to Upload
        </Button>
        {typeError && (
          <div style={{ color: 'red' }} role="alert">
            {typeError}
          </div>
        )}
      </Upload>
      {/* <form action="" onSubmit={handleFileSubmit}>
        <input type="file" onChange={(e) => uploadChanged(e)} />
        <button type="submit">UPLOAD</button>
        {typeError && <div role="alert">{typeError}</div>}
      </form> */}
      {/* view data */}
      {/* {excelData ? (
        <div>
          <table>
            <thead>
              <tr>
                {Object.keys(excelData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {excelData.map((individualExcelData, index) => (
                <tr key={index}>
                  {Object.keys(individualExcelData).map((key) => (
                    <td style={{ width: '120px', border: '1px solid #ccc' }} key={key}>
                      {individualExcelData[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No File is uploaded yet!</div>
      )} */}

      {excelData ? (
        <>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <Button type="primary" onClick={() => handleFileSubmit()}>
            Submit
          </Button>
        </>
      ) : (
        <div>No File is uploaded yet!</div>
      )}
    </>
  );
}

export default UploadGradeFile;
