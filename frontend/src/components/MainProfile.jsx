import React from 'react';
import '../css/ProfileContent.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
const ProfileMiddleColumn = ({userId} ) => {
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCheckDone, setFollowCheckDone] = useState(false); 
  const currentUserId = 5;
  const timelineData = [
    { id: 1, date: '2018.07', title: '台大資工系畢業' },
    { id: 2, date: '2020.09', title: '台大資工所畢業' },
    { id: 3, date: '2021.04', title: 'MediaTek' },
    { id: 4, date: '2022.09', title: 'Google' }
  ];

  useEffect(() => {
    axios.get(`/api/${userId}`)
      .then(res => setUser(res.data));
  }, [userId]);  


   useEffect(() => {
    axios.get(`/api/users/${currentUserId}/following`)
      .then(res => {
        const followingList = res.data;
        const alreadyFollowing = followingList.some(
          follow => follow.following_id === Number(userId)
        );
        setIsFollowing(alreadyFollowing);
        setFollowCheckDone(true);
      })
      .catch(err => {
        console.error('查詢追蹤清單失敗:', err);
        setFollowCheckDone(true); // 失敗也要結束 loading，避免按鈕卡住
      });
  }, [userId]);

  const handleFollowClick = async () => {
  try {
    if (isFollowing) {
      // 取消追蹤
      await axios.delete(`/api/users/${userId}/follow`, {
        params: { followerId: currentUserId }
      });
    } else {
      // 追蹤
      await axios.post(`/api/users/${userId}/follow`, null, {
        params: { followerId: currentUserId }
      });
    }
    setIsFollowing(!isFollowing);
  } catch (err) {
    console.error('追蹤操作失敗:', err);
  }
};
  return (
    <div className="middle-container">
      {/* 1. 上方灰色 Banner */}
      <div className="profile-banner">
        <span className="banner-placeholder">Banner(給Gemini)</span>
      </div>


      <div className="profile-action-bar">
        {followCheckDone ? (
          <button className="follow-btn" onClick={handleFollowClick}>
            <span className="plus-icon">{isFollowing ? '' : '+'}</span> 
            {isFollowing ? '追蹤中' : '追蹤'}
          </button>
        ) : (
          <button className="follow-btn" disabled style={{ opacity: 0.5 }}>
            載入中...
          </button>
        )}
      </div>

      {/* 2. 中間圓形頭貼與姓名區 */}
      <div className="profile-avatar-wrapper">
        <div className="profile-avatar"></div>
        <h2 className="profile-name">{user?.username ?? '載入中...'}</h2> 
      </div>

      {/* 新增：追蹤人數狀態列 */}
      <div className="profile-stats">
        <div className="stat-item">{user?.followerCount ?? '...'}人追蹤中</div>
        <div className="stat-divider"></div>
        <div className="stat-item">追蹤{user?.followingCount ?? '...'}人</div>
      </div>

      {/* 分隔線 */}
      <hr className="section-divider" />

      {/* 3. 下方履歷時間線 */}
      <div className="resume-timeline">
        {timelineData.map((node, index) => (
          <div key={node.id} className="timeline-node">
            
            {/* 左側：負責渲染圓點與軸線的區域 */}
            <div className="timeline-left-axis">
              <div className="timeline-dot"></div>
              {/* 如果不是最後一個節點，就渲染向下延伸的連續黑線 */}
              {index !== timelineData.length - 1 && (
                <div className="timeline-line"></div>
              )}
            </div>

            {/* 右側：文字資料區 */}
            <div className="timeline-info">
              <span className="timeline-date">{node.date}</span>
              <span className="timeline-title">{node.title}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileMiddleColumn;