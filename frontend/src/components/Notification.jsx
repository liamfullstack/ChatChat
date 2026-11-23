import React from 'react';
import '../css/Notification.css'; // 確保引入對應的樣式
import { useNavigate } from 'react-router-dom'; // ✅ 修正 1：把這一行的註解解開！

export default function NotificationItem({ avatar, text }) {
  const navigate = useNavigate(); // ✅ 宣告 navigate

  const handleUserClick = () => {
    // 實務上這裡會帶入使用者的真正 ID，我們這裡先隨便模擬傳入 "ah-ji-666" 
    const fakeUserId = "ah-ji-666"; 
    
    // 執行跳轉
    navigate(`/profile/${fakeUserId}`);
  };

  return (
    /* ✅ 修正 2：在這裡綁定 onClick 事件，並加上 style 讓滑鼠移過去變手指圖示 */
    <div 
      className="notification-toast" 
      onClick={handleUserClick} 
      style={{ cursor: 'pointer' }} 
    >
      {/* 左側圓形頭像 */}
      <div className="notification-avatar">
        {avatar ? <img src={avatar} alt="avatar" /> : <div className="avatar-placeholder"></div>}
      </div>
      
      {/* 右側通知文字內容 */}
      <div className="notification-content">
        {text}
      </div>
    </div>
  );
}