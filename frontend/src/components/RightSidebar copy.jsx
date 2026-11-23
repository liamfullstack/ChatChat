import React from 'react';
import TimelineItem from "../components/timline"


// ==========================================
// 2. 右側邊欄主元件 (RightSidebar)
// ==========================================
const RightSidebar = () => {

  
  // 模擬經歷資料
  const experiences = [
    {
      id: 1,
      date: "2018.07",
      title: "成功大學電機工程學系\n畢業"
    },
    {
      id: 2,
      date: "2020.04",
      title: "宏通數碼"
    },
    {
      id: 3,
      date: "2021.04",
      title: "果核數位"
    },
    {
      id: 4,
      date: "2024.12",
      title: "陽明交通大學 多媒體工程所\n肄業"
    }
  ];

  return (
    <div className="w-full max-w-sm p-6 pt-10 font-sans min-h-screen">
      
      {/* 頂部標題與按鈕區 */}
      <div className="flex justify-between items-center mb-8 pr-2">
        <h3 className="font-bold text-gray-900 text-[15px] tracking-wide">
          Education & Work Experience
        </h3>
        <button className="bg-[#78716C] hover:bg-[#57534E] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors">
          New Stone
        </button>
      </div>

      {/* 時間軸列表 */}
      <div className="pl-2">
        {experiences.map((exp, index) => (
          <TimelineItem 
            key={exp.id}
            date={exp.date}
            title={exp.title}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>

    </div>
  );
};

export default RightSidebar;