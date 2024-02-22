import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ImportOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import * as XLSX from 'xlsx';

import SubMenu from '../../components/shared/subMenu';
import { getClassroomParticipant } from '../../services/classroom';
import { createAndUpdateIdMappingByTeacher } from '../../services/teacher';

const ReadFileExcelListStudents = () => {
  const [excelData, setExcelData] = useState(null);
  const [filename, setFilename] = useState();
  const [classParticipants, setClassParticipants] = useState();
  const location = useLocation();

  const idClass = location.pathname.split('/')[2];

  useEffect(() => {
    const getClassParticipants = async (id) => {
      const dataRespond = await getClassroomParticipant(id);
      console.log('Data respond', dataRespond);
      setClassParticipants(dataRespond.data.data);
    };

    getClassParticipants(idClass);
  }, [idClass]);

  const listStudents = classParticipants?.filter((item) => item.role === 'student') || [];
  console.log('List student: ', listStudents);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFilename(file.name);

    if (file) {
      try {
        const workbook = await readExcelFile(file);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        setExcelData(sheetData);
        console.log(sheetData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          resolve(workbook);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const columns = excelData
    ? excelData[0].map((header, index) => ({
        title: header,
        dataIndex: `col${index}`,
        key: `col${index}`,
      }))
    : [];

  const dataSource = excelData
    ? excelData.slice(1).map((row, rowIndex) =>
        row.reduce(
          (acc, cell, cellIndex) => {
            acc[`col${cellIndex}`] = cell;
            return acc;
          },
          { key: `row${rowIndex}` }
        )
      )
    : [];

  console.log('Columns: ', columns);
  console.log('Data source: ', dataSource);

  const handleUpdateData = () => {
    const getDataStudentMappingId = () => {
      const dataStudentMappingId = dataSource.map((data) => {
        const dataIndexName = columns.find((column) => ['fullname', 'name', 'họ tên'].includes(column.title)).dataIndex;
        const dataIndexIdMapping = columns.find((column) =>
          ['id', 'idStudent', 'idMapping'].includes(column.title)
        ).dataIndex;
        const student = listStudents.find((student) => student.name === data[dataIndexName]);
        return {
          id: student ? student.id : null,
          name: data[dataIndexName],
          idMapping: data[dataIndexIdMapping] ? data[dataIndexIdMapping] : null,
        };
      });

      return dataStudentMappingId;
    };
    const dataUpdatedMappingId = getDataStudentMappingId();
    console.log('ALOALO123: ', dataUpdatedMappingId);

    const updateIdStudent = async (dataUpdatedMappingId) => {
      for (const student of dataUpdatedMappingId) {
        if (student.idMapping !== null) {
          const idUser = student.id;
          const updatedIdMapping = {
            id: student.idMapping,
          };
          const updatedIdMappingRes = await createAndUpdateIdMappingByTeacher(idUser, updatedIdMapping);
          console.log(updatedIdMappingRes);
        }
      }
    };

    updateIdStudent(dataUpdatedMappingId);
  };

  return (
    <div>
      <SubMenu></SubMenu>
      <Button style={{ display: 'inline', marginTop: '16px', marginBottom: '16px' }}>
        <UploadOutlined /> Upload danh sách sinh viên
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
      </Button>

      {excelData && (
        <div>
          <h2>Dữ liệu trong file {filename}: </h2>
          <Button style={{ marginBottom: '16px' }} onClick={handleUpdateData}>
            <ImportOutlined /> Update data
          </Button>
          <Table columns={columns} dataSource={dataSource} bordered />
        </div>
      )}
    </div>
  );
};

export default ReadFileExcelListStudents;
