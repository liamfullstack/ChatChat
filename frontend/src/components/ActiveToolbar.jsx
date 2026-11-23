import React from 'react';

export default function ActiveToolbar({ onSubmit }) {
  return (
    <div>
      <div className="post-toolbar">
        {/* Emoji 按鈕 */}
        <button className="toolbar-btn" title="插入表情符號">
          <svg className="toolbar-icon" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </button>
        
        {/* 圖片上傳按鈕 */}
        <button className="toolbar-btn" title="上傳圖片">
          <svg className="toolbar-icon" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </button>

        {/* 中間的空白區塊，負責把發送按鈕推到最右邊 */}
        <div className="toolbar-spacer"></div>

        {/* 發送按鈕 (箭頭圖標) */}
        <button 
          className="toolbar-btn submit-btn" 
          title="發布貼文"
          onClick={onSubmit}
        >
          <svg className="toolbar-icon send-icon" viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}