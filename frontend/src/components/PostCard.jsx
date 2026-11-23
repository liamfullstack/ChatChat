import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainContent.css';

// ⚠️ 暫時寫死，之後接登入機制要換成真實的當前使用者 ID
const CURRENT_USER_ID = 5;

const PostCard = ({ postData, initialLiked = false, onDelete }) => {
  // ⚠️ 預覽環境沒有 Router，這裡做個防呆替身。本地專案請換回： const navigate = useNavigate();
   const navigate = useNavigate()

  // 務實防呆：相容後端欄位與假資料欄位
  const initialLikes = postData.likecount ?? postData.likes ?? 0;
  const initialComments = postData.commentCount ?? postData.comments ?? 0;
  const [isDeleting, setIsDeleting] = useState(false);
  const [liked, setLiked] = useState(initialLiked); // 之後可接 postData.isLikedByCurrentUser
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(postData.content);
  const [editContent, setEditContent] = useState(postData.content);
  // 按讚的樂觀更新邏輯
  const handleToggleLike = async () => {
    if (isLiking) return;

    const previousLiked = liked;
    const previousCount = likeCount;
    const nextLiked = !liked;

    // 1. 樂觀更新：先讓畫面產生反應，給使用者極致流暢的體驗
    setLiked(nextLiked);
    setLikeCount(nextLiked ? previousCount + 1 : previousCount - 1);
    setIsLiking(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postData.id}/like?userId=${CURRENT_USER_ID}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        const rawBody = await response.text();
        let errorMessage = rawBody;
        try {
          errorMessage = JSON.parse(rawBody).message || rawBody;
        } catch { }
        throw new Error(`按讚失敗（狀態碼 ${response.status}）：${errorMessage}`);
      }

      const data = await response.json();
      // 2. 用後端結果校正
      if (data && data.liked !== undefined) {
        setLiked(data.liked);
      }
    } catch (error) {
      // 3. 失敗就無情復原
      console.error('按讚操作失敗，復原狀態：', error);
      setLiked(previousLiked);
      setLikeCount(previousCount);
    } finally {
      setIsLiking(false);
    }
  };

  // 取消編輯
  const handleCancelEdit = () => {
    setEditContent(currentContent);  // 還原成原本內容
    setIsEditing(false);
  };
  const handleStartDelete = () => {
    setIsDeleting(true);
    setIsMenuOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };
  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/posts/${postData.id}?requestUserId=${CURRENT_USER_ID}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error(`刪除失敗（狀態碼 ${res.status}）`);

      setIsDeleting(false);
      onDelete?.(postData.id);   // ← 通知父層把這張卡片移除
    } catch (error) {
      console.error('刪除失敗：', error);
      alert('刪除失敗，請稍後再試');
      setIsDeleting(false);
    }
  };

  // 儲存編輯
  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${postData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: CURRENT_USER_ID,
          content: editContent,
        }),
      });
      if (!res.ok) throw new Error(`編輯失敗（狀態碼 ${res.status}）`);

      setCurrentContent(editContent);  // ← 馬上更新畫面,不用重整
      setIsEditing(false);
    } catch (err) {
      console.error('編輯儲存失敗：', err);
      alert('編輯失敗，請稍後再試');
    }
  };

  return (
    <>
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">

          {/* Modal 白色主體 */}
          <div className="bg-white w-full max-w-xl rounded-none shadow-2xl overflow-hidden flex flex-col border border-gray-800">

            {/* Modal 標題列 (還原設計稿的黑線與置中) */}
            <div className="px-6 py-4 border-b border-gray-800 flex justify-center items-center bg-white relative">
              <h3 className="font-serif font-bold text-gray-900 text-xl tracking-wide">Edit Post</h3>
            </div>

            {/* Modal 輸入區 */}
            <div className="p-6 pb-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full min-h-[160px] p-0 text-gray-900 bg-transparent border-0 focus:ring-0 resize-none text-lg outline-none"
                placeholder="想修改些什麼？"
                autoFocus
              />
            </div>

            {/* Modal 底部按鈕區 */}
            <div className="px-6 py-4 bg-white border-t border-gray-800 flex justify-between items-center">

              {/* 左側工具列 */}
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                  Emoji
                </button>
                <button className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM140,116a12,12,0,1,1-12-12A12,12,0,0,1,140,116Zm50.56,66.52a8,8,0,0,1-11.08-1.08L140,135.08l-37.4,43.64a8,8,0,0,1-12.12-10.4l44-51.33a8,8,0,0,1,11.51-.55l45.65,55A8,8,0,0,1,190.56,182.52Z"></path></svg>
                  Add Photo
                </button>
              </div>

              {/* 右側操作列 */}
              <div className="flex gap-4 items-center">
                <button
                  onClick={handleCancelEdit}
                  className="px-2 py-2 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2 text-sm font-medium bg-[#9A8cFF] text-white hover:bg-indigo-500 rounded-full shadow-sm transition-colors"
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200">
            <div className="p-6 text-center">
              {/* 警告圖示 */}
              <svg className="mx-auto mb-4 w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <h3 className="mb-6 text-lg font-bold text-gray-900">是否刪除此貼文？</h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleCancelDelete}
                  className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                >
                  確定刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* // 卡片外層 */}
      <div className="border border-gray-300 bg-white shadow-sm mb-6 rounded-lg">

        {/* 內容區 */}
        <div className="min-h-[120px] p-5 relative">

          {/* 貼文頭部：作者資訊與右上角操作選單 */}
          <div className="flex justify-between items-start mb-4 relative">

            {/* 左側：作者資訊 (包含大頭貼防呆機制) */}
            <div className="flex items-center gap-3">
              {postData.avatar_url || postData.author?.avatar ? (
                <img
                  src={postData.avatar_url || postData.author?.avatar}
                  alt={postData.username || postData.author?.name}
                  className="w-9 h-9 rounded-full object-cover shadow-sm shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[var(--color-primary-900)] flex items-center justify-center text-white font-bold shadow-sm shrink-0 text-sm">
                  {postData.username ? postData.username.charAt(0).toUpperCase() : '?'}
                </div>
              )}
              <span className="font-bold text-gray-900 text-sm">
                {postData.username || postData.author?.name}
              </span>
            </div>

            {/* 右側：三個點的操作選單 */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,76a12,12,0,1,0-12-12A12,12,0,0,0,128,76Zm0,104a12,12,0,1,0,12,12A12,12,0,0,0,128,180Z"></path>
                </svg>
              </button>

              {/* 下拉選單 (Dropdown) */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 animate-fade-in-down">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    onClick={() => {
                      setEditContent(currentContent);  // 把目前內容塞進編輯框
                      setIsEditing(true);              // 打開 Modal
                      setIsMenuOpen(false);
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l12.69-12.69,44.69,44.69Z"></path></svg>
                    Edit
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors" onClick={handleStartDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 貼文文字 */}
          <p className="text-gray-800 leading-relaxed text-sm  whitespace-pre-wrap">
            {currentContent}
          </p>
        </div>

        {/* 底部互動區 */}
        <div className="border-t border-gray-300 p-3 px-5 flex gap-6 bg-white">

          {/* 留言按鈕 (觸發 navigate 導航) */}
          <button
            onClick={() => navigate(`/posts/${postData.id}`)}
            className="flex items-center gap-2 hover:text-gray-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="font-bold text-gray-900 text-sm">{initialComments}</span>
            <span className="text-xs font-semibold text-gray-400">Comments</span>
          </button>

          {/* 按讚按鈕 (結合 liked 狀態動態改變顏色與填滿) */}
          <button
            onClick={handleToggleLike}
            disabled={isLiking}
            className={`flex items-center gap-2 transition-colors ${liked ? 'text-[var(--color-primary-600)]' : 'hover:text-gray-500 text-gray-800'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            <span className={`font-bold text-sm ${liked ? 'text-[var(--color-text)]' : 'text-gray-900'}`}>
              {likeCount}
            </span>
            <span className={`text-xs font-semibold ${liked ? 'text-[var(--color-text)]' : 'text-gray-400'}`}>
              Likes
            </span>
          </button>

        </div>
      </div>
    </>
  );
};


export default PostCard;