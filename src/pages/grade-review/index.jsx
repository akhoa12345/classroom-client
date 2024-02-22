import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Table } from 'antd';

import SubMenu from '../../components/shared/subMenu';
import { getAllGradeReviewsOfClassroom } from '../../services/grade';

import Status from './components/Status';

const columns = [
  {
    title: 'Sinh viên phúc khảo',
    dataIndex: 'studentName',
    width: '20%',
  },
  {
    title: 'Cột điểm phúc khảo',
    dataIndex: 'structureGrade',
  },
  {
    title: 'Điểm hiện tại',
    dataIndex: 'currentGrade',
  },
  {
    title: 'Điểm mong đợi',
    dataIndex: 'expectationGrade',
  },
  {
    title: 'Lý do',
    dataIndex: 'reason',
    width: '30%',
  },
  {
    title: 'Tình trạng',
    dataIndex: 'status',
    render: (_, record) => <Status status={record.status} />,
  },
  {
    title: 'Chi tiết phúc khảo',
    dataIndex: 'detailReview',
    render: (_, record) => {
      const idClass = location.pathname.split('/')[2];
      return <Link to={`/classroom/${idClass}/grade-review/${record.id}`}>Chi tiết</Link>;
    },
  },
];

export default function GradeReview() {
  const [listReviews, setListReviews] = useState([]);
  const location = useLocation();

  const idClass = location.pathname.split('/')[2];
  console.log('ID Class: ', idClass);

  useEffect(() => {
    const getAllGradeReviews = async (idClass) => {
      const dataRespond = await getAllGradeReviewsOfClassroom(idClass);
      const gradReviewRes = dataRespond.data.data;
      console.log('Data respond: ', dataRespond);
      const dataGradeReview = gradReviewRes?.map((review) => ({
        id: review._id,
        studentName: review.studentInfo.name + ' (' + review.studentInfo.email + ')',
        structureGrade: review.structureGrade.name,
        currentGrade: review.currentGrade,
        expectationGrade: review.expectationGrade,
        reason: review.reason,
        status: review.status,
      }));
      console.log('dataGradeReview: ', dataGradeReview);
      setListReviews(dataGradeReview);
    };
    getAllGradeReviews(idClass);
  }, [idClass]);

  return (
    <div>
      <SubMenu></SubMenu>
      <Table columns={columns} dataSource={listReviews} />;
    </div>
  );
}
