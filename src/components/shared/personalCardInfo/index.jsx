import { Card, Flex, Typography } from 'antd';

import '../../../css/cardInfoStyle.css';

export default function PersonalCardInfo(props) {
  const data = props.data;
  return (
    <div className="cardInfo">
      <Card
        className="cardStyle"
        hoverable
        bodyStyle={{
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <Flex>
          <img className="personalImage" alt="avatar" src={data.srcImage} />
          <Flex className="content" vertical align="flex-start">
            <Typography.Title>
              {data.studentName} ({data.position})
            </Typography.Title>
            <Typography.Paragraph className="item-content">Mã số sinh viên: {data.studentID} </Typography.Paragraph>
            <Typography.Paragraph className="item-content">
              Ngày tháng năm sinh: {data.dateOfBirth}{' '}
            </Typography.Paragraph>
            <Typography.Paragraph className="item-content">Chuyên ngành chính: {data.major} </Typography.Paragraph>
            <Typography.Paragraph className="item-content">Sở thích: {data.hobbies} </Typography.Paragraph>
            <Typography.Paragraph className="item-content">Môn thể thao yêu thích: {data.sports} </Typography.Paragraph>
            <Typography.Paragraph className="item-content">Điểm mạnh: {data.strengths} </Typography.Paragraph>
            <Typography.Paragraph className="item-content">Điểm yếu: {data.weaknesses} </Typography.Paragraph>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}

PersonalCardInfo.propTypes = {
  data: Object,
};
