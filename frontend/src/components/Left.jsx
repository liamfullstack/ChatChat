import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
const CURRENT_USER_ID = 5;   // 暫時寫死,跟你其他檔案一致;之後抽 config


const ProfileSidebar = () => {
  const [followers, setFollowers] = useState([]);   // 改成空陣列,等 API 填
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
const navigate = useNavigate();


  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await fetch(`/api/users/${CURRENT_USER_ID}/following-details`);
        if (!res.ok) throw new Error('追蹤清單載入失敗');
        const data = await res.json();
        console.log('following-details 長這樣:', data);   // ← 先看欄位名
        setFollowers(data);
        console.log("Followers的資料", data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`/api/${CURRENT_USER_ID}`);
        if (!res.ok) throw new Error('用戶資料載入失敗');
        const data = await res.json();
        console.log("User Profile:", data);
        setUserProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);  // 不管成功還是失敗,載入結束
      }
    };
    fetchFollowing();
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-80 min-h-screen flex items-center justify-center">
        <span className="text-gray-400 text-sm">載入中...</span>
      </div>
    );
  }

  return (
    // 左欄主容器：純白底色、右側極細邊框，高度滿版
    <div className="w-80 bg-white min-h-screen py-10 px-8 border-r border-gray-200 flex flex-col items-center font-sans">

      {/* 1. 頭像與名稱區塊 */}
      <div className="flex flex-col items-center mb-8">
        {userProfile && (    // ← 加這個,null 的時候整塊跳過
          userProfile.avatarUrl ? (
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.username}
              className="w-9 h-9 rounded-full object-cover shadow-sm shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[var(--color-primary-900)] flex items-center justify-center text-white font-bold shadow-sm shrink-0 text-sm">
              {userProfile.username ? userProfile.username.charAt(0).toUpperCase() : '?'}
            </div>
          )
        )}
        <h1 className="text-2xl font-medium text-gray-900 tracking-wide">
          {userProfile ? userProfile.username : "-"}
        </h1>
      </div>

      {/* 2. 數據統計區塊 (利用 Flex space-between 完美對齊三等分) */}
      <div className="flex w-full justify-between px-2 mb-10 text-center">
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-gray-900">
            {userProfile ? userProfile.postCount : "-"}
          </span>
          {/* 忠於原稿：這裡的標籤使用了稍微帶有襯線/不同字重的質感 */}
          <span className="text-sm text-gray-600 font-serif mt-1">Posts</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-gray-900">
            {userProfile ? userProfile.followerCount : '-'}
          </span>
          <span className="text-sm text-gray-600 font-serif mt-1">Followers</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-gray-900">
            {userProfile ? userProfile.followingCount : '-'}
          </span>
          <span className="text-sm text-gray-600 font-serif mt-1">Following</span>
        </div>
      </div>

      {/* 3. 追蹤者清單區塊 (Pill Shape Cards) */}
      <div className="w-full flex flex-col gap-3 ">
        {followers.map((user) => (
          <div
            key={user.id}
            // 膠囊狀卡片：淺灰底色、全圓角、加入 hover 互動微狀態
            className="flex items-center w-full bg-[var(--color-surface)] rounded-lg p-2 pr-4 transition-colors hover:bg-[var(--color-primary-300)] cursor-pointer"
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary-900)] flex items-center justify-center text-white font-bold mr-4 shrink-0">
                {user.username ? user.username.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold text-gray-800 leading-tight">
                {user.username}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">
                {user.id}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProfileSidebar;