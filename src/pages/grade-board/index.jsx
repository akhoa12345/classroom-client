import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, Input, Table } from 'antd';
import { isString } from 'antd/es/button';
import PropTypes from 'prop-types';

import ExcelExportButton from '../../components/shared/exportToExcel';
import SubMenu from '../../components/shared/subMenu';
import NotificationContext from '../../contexts/notification/notificationContext';
import {
  createAndUpdateGrade,
  finalizeStructureGrade,
  getAllGradeStructuresOfClassroom,
  getAllGradeStudentsOfClassroom,
} from '../../services/grade';
import { notifyAllStudentInClassroom } from '../../services/notification';
import { createAndUpdateIdMappingByTeacher } from '../../services/teacher';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  console.log('Index: ', index);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({ editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave(
        {
          ...record,
          ...values,
        },
        dataIndex
      );
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Vui lòng nhập điểm`,
          },
          {
            max: 10,
            message: 'Tối đa 10 điểm',
          },
          {
            min: 0,
            message: 'Tối thiểu 0 điểm',
          },
        ]}
      >
        <Input type="number" ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const averageColumn = {
  title: 'Điểm TB Cộng',
  dataIndex: 'average',
  editable: false,
};

const defaultColumns = [
  {
    title: 'Họ tên',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Mã số sinh viên',
    dataIndex: 'idMapping',
    width: '15%',
    editable: true,
  },
];

function GradeBoard() {
  const [dataSource, setDataSource] = useState();
  const [allGradeStructure, setAllGradeStructure] = useState();
  const location = useLocation();

  const idClass = location.pathname.split('/')[2];
  const { openNotification } = useContext(NotificationContext);

  const listGradeComposition = useMemo(() => {
    const gradeColumns = allGradeStructure?.map((item) => ({
      title: () => (
        <>
          {item.name} ({item.scale}){' '}
          <Button type="primary" danger onClick={() => handleFinalize(item?.id, !item.isFinalize)}>
            {!item?.isFinalize ? 'Finalize' : 'Undo'}
          </Button>
        </>
      ),
      dataIndex: item._id,
      editable: !item.isFinalize,
      scale: item.scale,
    }));
    return gradeColumns && [...defaultColumns, ...gradeColumns, averageColumn];
  }, [allGradeStructure]);

  console.log(listGradeComposition);

  useEffect(() => {
    const getAllGradeStructures = async (idClass) => {
      const dataRespond = await getAllGradeStructuresOfClassroom(idClass);
      const gradeDataRespond = dataRespond.data.data;
      setAllGradeStructure(gradeDataRespond);
    };
    getAllGradeStructures(idClass);
  }, [idClass]);

  useEffect(() => {
    const getAllGradeStudents = async (idClass) => {
      const dataRespond = await getAllGradeStudentsOfClassroom(idClass);
      console.log('Grade student: ', dataRespond.data.data);
      const gradeStudents = dataRespond.data.data;
      const transformedData = gradeStudents.map((item) => {
        const { studentInfo, grades } = item;
        const resultItem = {
          key: studentInfo._id,
          name: studentInfo.name,
          idMapping: studentInfo.idMapping,
        };

        listGradeComposition?.forEach((column) => {
          if (column.dataIndex !== 'name') {
            if (column.dataIndex !== 'idMapping') {
              resultItem[column.dataIndex] = '_';
            } else {
              if (studentInfo.idMapping === undefined) {
                resultItem[column.dataIndex] = '_';
              }
            }
          }
        });

        grades.forEach((gradeItem) => {
          const columnIndex = listGradeComposition?.findIndex(
            (column) => column.dataIndex === gradeItem.structureGrade
          );
          if (columnIndex > -1) {
            resultItem[`${gradeItem.structureGrade}`] = gradeItem.grade;
          }
        });

        console.log('result item: ', resultItem);
        resultItem['average'] = calculateAverageScore(resultItem);

        return resultItem;
      });
      console.log('Data transform', transformedData);
      setDataSource(transformedData);
    };
    getAllGradeStudents(idClass);
  }, [idClass, listGradeComposition]);

  const calculateAverageScore = (record) => {
    let totalScore = 0;
    let totalWeight = 0;

    listGradeComposition?.forEach((column) => {
      if (column.dataIndex !== 'name' && column.dataIndex !== 'idMapping') {
        const score = parseFloat(record[column.dataIndex]) || 0;
        const weight = parseFloat(column.scale) || 0;

        totalScore += score * weight;
        totalWeight += weight;
      }
    });
    console.log('Score: ' + totalScore + ' - Weight: ' + totalWeight);
    const averageScore = totalWeight > 0 ? totalScore / totalWeight : 0;
    return averageScore.toFixed(2);
  };

  const handleSave = async (row, dataIndexChange) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log('Row', row);
    console.log('Item: ', item);

    if (dataIndexChange == 'idMapping') {
      const updatedIdMapping = {
        id: row[dataIndexChange],
      };

      const idUser = row.key;
      console.log(updatedIdMapping);

      const updatedIdMappingRes = await createAndUpdateIdMappingByTeacher(idUser, updatedIdMapping);
      console.log('Mapping respond: ', updatedIdMappingRes);
      if (updatedIdMappingRes.data.status === 'success') {
        setDataSource(newData);
      }
    } else {
      const dataUpdatedGrade = {
        student: row.key,
        structureGrade: dataIndexChange,
        grade: row[dataIndexChange],
      };
      console.log('Data update grade: ', dataUpdatedGrade);
      const updatedGradeRes = await createAndUpdateGrade(dataUpdatedGrade);
      console.log('Data response: ', updatedGradeRes);
      if (updatedGradeRes.data.status == 'success') {
        const updatedDataSource = newData.map((item) => {
          if (item.key === row.key) {
            item['average'] = calculateAverageScore(item);
          }
          return item;
        });
        setDataSource(updatedDataSource);
      }
    }
  };

  const handleFinalize = async (gradeStructureId, isFinalize) => {
    try {
      const isFinalizeData = {
        isFinalize: isFinalize,
      };
      const responseFinalizeStructureGrade = await finalizeStructureGrade(gradeStructureId, isFinalizeData);
      console.log(responseFinalizeStructureGrade);

      if (responseFinalizeStructureGrade.data.status === 'success') {
        // Notify call API
        const data = {
          type: 'FINALIZE_GRADE',
          redirect: `/classroom/${idClass}/studentGrade`,
        };
        const result = await notifyAllStudentInClassroom(idClass, data);
        console.log('Response sau khi call API notify:', result);

        // set lại state
        setAllGradeStructure((prev) => {
          return prev.map((item) => {
            if (item._id === responseFinalizeStructureGrade?.data?.data?.id) {
              return { ...item, isFinalize: isFinalize };
            }
            return item;
          });
        });

        openNotification({
          type: 'success',
          title: 'Chốt cột điểm',
          description: isFinalize ? 'Chốt cột điểm thành công' : 'Hoàn trả cột điểm thành công',
        });
      }
    } catch (error) {
      console.log('Lỗi: ', error);
      openNotification({
        type: 'error',
        title: 'Chốt cột điểm',
        description: isFinalize ? 'Chốt cột điểm thất bại' : 'Hoàn trả cột điểm thất bại',
      });
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = listGradeComposition?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const gradeBoardExportExcel = dataSource?.map((item) => {
    const newItem = {};
    columns?.forEach((column) => {
      if (!isString(column.title)) {
        const [gradeStructure] = allGradeStructure.filter((grade) => grade._id === column.dataIndex);
        console.log(gradeStructure);
        newItem[gradeStructure.name] = item[column.dataIndex];
      } else newItem[column.title] = item[column.dataIndex];
    });
    return newItem;
  });
  console.log('gradeBoardExportExcel: ', gradeBoardExportExcel);

  const gradeBoardHasNoGradeExportExcel = dataSource?.map((item) => {
    const newItem = {};
    columns?.forEach((column) => {
      if (column.dataIndex == 'name') {
        newItem[column.title] = item[column.dataIndex];
      } else {
        let columnName = '';
        if (!isString(column.title)) {
          const [gradeStructure] = allGradeStructure.filter((grade) => grade._id === column.dataIndex);
          columnName = gradeStructure.name;
          console.log(columnName);
        } else columnName = column.title;
        newItem[columnName] = '';
      }
    });
    return newItem;
  });

  console.log('gradeBoardHasNoGradeExportExcel: ', gradeBoardHasNoGradeExportExcel);

  return (
    <div>
      <SubMenu></SubMenu>
      <ExcelExportButton
        data={gradeBoardHasNoGradeExportExcel}
        fileName="Template_BangDiem"
        sheetName="Data"
        buttonName="Download bảng điểm mẫu (.xlsx)"
      />
      <ExcelExportButton
        data={gradeBoardExportExcel}
        fileName="BangDiem"
        sheetName="Data"
        buttonName="Download bảng điểm chính thức (.xlsx)"
      />
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

export default GradeBoard;

EditableCell.propTypes = {
  title: PropTypes.func,
  editable: PropTypes.bool,
  children: PropTypes.node,
  dataIndex: PropTypes.string,
  record: PropTypes.object,
  handleSave: PropTypes.func,
  restProps: PropTypes.object,
};

EditableRow.propTypes = {
  index: PropTypes.string,
  props: PropTypes.object,
};
