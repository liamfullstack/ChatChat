import React from 'react';
import CommentItem from '../components/CommentItem';
import '../css/CommentThread.css';

function CommentBoard() {
  // 模擬扁平資料庫資料
  const mockData = [
    { id: 1, parentId: null, name: "Liam", content: "今天小 Twitter 的進度非常紮實！" },
    { id: 2, parentId: 1, name: "Nova", content: "沒錯，結構跟動畫都到位了，非常務實。" },
    { id: 3, parentId: 2, name: "打工人", content: "純 CSS 真的順，而且程式碼好好懂！" },
    { id: 4, parentId: 1, name: "小明", content: "程式碼乾淨就是舒服，推一個。" }
  ];

  // 篩選出最頂層的推文
  const rootComments = mockData.filter(comment => comment.parentId === null);

  return (
    <div className="comment-box">
      <h3 style={{ margin: '0 0 12px 0', color: '#111827', fontSize: '16px' }}>推文動態牆</h3>
      
      {rootComments.map(rootComment => (
        <CommentItem 
          key={rootComment.id} 
          currentComment={rootComment} 
          allComments={mockData} 
        />
      ))}
    </div>
  );
}

export default CommentBoard;