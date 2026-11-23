import React, { useState } from 'react';
import "../css/timeline.css"

const TimelineItem = ({ id, date, title, isLast = false, onDelete }) => {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex relative">
      {/* 左側時間軸視覺 */}
      <div className="flex flex-col items-center mr-4">
        {/* 節點圓圈：點了切換確認狀態 */}
        <button
          onClick={() => setConfirming((prev) => !prev)}
          className="w-4 h-4 rounded-full bg-[var(--color-primary-400)] z-10 shrink-0 mt-1 cursor-pointer hover:bg-[var(--color-primary-700)] transition-colors"
          aria-label="刪除這筆紀錄"
        ></button>
        {/* 垂直實線 */}
        {!isLast && <div className="w-[2px] bg-[var(--color-primary-400)] flex-1 mt-1 -mb-2"></div>}
      </div>

      {/* 右側文字內容 */}
      <div className="pb-8 font-sans">
        <p className="text-[13px] text-gray-700 font-medium mb-1 leading-none">{date}</p>
        <h4 className="text-[15px] font-bold text-gray-900 leading-tight">
          {title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h4>

        {/* 點圓點後才出現的確認列 */}
        {confirming && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500">刪除這筆？</span>
            <button
              onClick={() => onDelete(id)}
              className="rounded px-2 py-1 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              刪除
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              取消
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;