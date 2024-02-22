import PersonalCardInfo from '../../components/shared/personalCardInfo';

import '../../css/landingStyle.css';

const listPersonalInfo = [
  {
    studentID: '20120290',
    studentName: 'Trần Khánh Hoàng',
    dateOfBirth: '13/07/2002',
    position: 'Nhóm trưởng',
    major: 'Kĩ thuật phần mềm',
    hobbies: 'bơi lội, cầu lông, và đặc biệt là du lịch',
    sports: 'bơi, cầu lông',
    strengths: 'vui vẻ, năng nổ, hòa đồng, thuyết trình và giao tiếp tốt',
    weaknesses: 'dễ nổi nóng, còn làm việc theo hứng thú mà không có kế hoạch cụ thể',
    srcImage: '/img/KhanhHoang.jpg',
  },
  {
    studentID: '20120585',
    studentName: 'Lê Văn Thịnh',
    dateOfBirth: '13/07/2002',
    position: 'Thành viên',
    major: 'Kĩ thuật phần mềm',
    hobbies: 'đọc sách, nghiên cứu kiến thức trong lĩnh vực công nghệ',
    sports: 'bóng rổ, leo núi',
    strengths: 'khả năng phân tích và sáng tạo, tự chủ và làm việc hiệu quả độc lập',
    weaknesses: 'đôi khi thận trọng quá mức',
    srcImage: '/img/VanThinh.jpg',
  },
  {
    studentID: '19120548',
    studentName: 'Phùng Anh Khoa',
    dateOfBirth: '13/07/2002',
    position: 'Thành viên',
    major: 'Kĩ thuật phần mềm',
    hobbies: 'nấu ăn, thưởng thức ẩm thực địa phương khi đi du lịch.',
    sports: 'đạp xe, chạy bộ',
    strengths: 'khả năng giao tiếp, hòa đồng với mọi người',
    weaknesses: 'ít kiên nhẫn trong công việc',
    srcImage: '/img/AnhKhoa.jpg',
  },
];

export default function Landing() {
  return (
    <div>
      <div
        style={{
          paddingLeft: '50px',
          paddingRight: '50px',
          textAlign: 'justify',
          fontSize: '20px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          lineHeight: '2',
        }}
      >
        Nhóm chúng tôi là một đội ngũ đầy năng động và đa tài, gồm ba thành viên tận tâm đang học tập trong chuyên ngành
        Kỹ thuật Phần mềm. Mỗi thành viên của chúng tôi đều mang theo những đặc điểm riêng biệt, tạo nên một hỗn hợp đa
        dạng của sở thích, kỹ năng, và tính cách. Chúng tôi là một nhóm đồng đội, sẵn sàng kết hợp sức mạnh cá nhân để
        đối mặt với mọi thách thức và đạt được những thành công lớn trong lĩnh vực chúng tôi đang theo đuổi. Cùng nhau,
        chúng tôi hướng đến mục tiêu chung của việc xây dựng và phát triển các sản phẩm phần mềm tốt.
      </div>
      <div className="listCardInfo">
        {listPersonalInfo.map((personalInfo) => (
          <div key={personalInfo.studentID} className="itemCardInfo">
            <PersonalCardInfo data={personalInfo} />
          </div>
        ))}
      </div>
    </div>
  );
}
