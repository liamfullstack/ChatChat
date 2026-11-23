import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentItem from '../components/CommentItem'
// ==========================================
// 1. 單層巢狀留言元件 (CommentItem)
// ==========================================


// ==========================================
// 2. 貼文詳情主頁面 (PostDetail)
// ==========================================
const PostDetail = () => {
  const [newComment, setNewComment] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comment, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (!response.ok) throw new Error('留言載入失敗');
      const data = await response.json();
      console.log("Tree的Data長怎樣:", data);
      //   console.log("Post ID是", param);
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/posts/${postId}`);

        if (!response.ok) {
          throw new Error(`找不到這篇貼文（狀態碼 ${response.status}）`);
        }
        {/*React use Effect 中的isCancelled模式
            問題場景:
            元件發出非同步請求(如fetch)後，若使用者在請求還沒回應前就離開頁面(元件被卸載)，請求完成時
            仍會嘗試呼叫`setState`，導致console出現警告:
            Warning: Can't perform a React state update on an unmounted component.
            原因:
            useEffect裡的非同步函式不會因為元件卸載就自動停止執行，他仍會跑完，並嘗試更新一個已經不存在的元件的state
            解法:
            在useEffect內宣告一個布林旗標isCancelled，並在清除函式(cleanup function)中把它設為true。每次要更新state前，先檢查這個旗標
              
              */}
        const data = await response.json();
        console.log("我拿到的資料是", data);
        if (!isCancelled) {
          setPost(data);
        }

      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);

        }
      }
    };

    fetchPost();
    fetchComments();

    return () => {
      isCancelled = true;
    };
  }, [postId]);

   
  function timeAgo(dateString) {
  const diff = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return '剛剛';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} 分鐘前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小時前`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} 天前`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} 週前`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} 個月前`;
  const years = Math.floor(days / 365);
  return `${years} 年前`;
}

   const handleNewCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      console.log("你好");
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          parentId: null
        })
      });

      if (!response.ok) throw new Error('留言送出失敗');

      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };


  if (isLoading) {
    return <div className="...">載入中...</div>;
  }

  if (error) {
    return (
      <div className="...">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>返回上一頁</button>
      </div>
    );
  }


  return (
    <div className="w-full max-w-2xl mx-auto bg-white font-sans border-x border-gray-200 min-h-screen flex flex-col">

      {/* 1. 頂部導覽列 */}
      <div className="flex items-center px-4 py-3 border-b-2 border-gray-800 sticky top-0 bg-white z-10">
        <button className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors" onClick={() => navigate(-1)}>
          {/* 返回箭頭 SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="flex-1 text-center font-serif font-bold text-lg text-gray-900 mr-8 tracking-wide">
          Posts
        </h1>
      </div>

      {/* 2. 作者與互動數據列 (完美還原設計圖的單行整合) */}
      <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-800">
        {/* 左側：作者名 */}
        <span className="font-serif font-bold text-gray-900 text-lg">{post.username}</span>

        {/* 中間：讚數與留言數 */}
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            <strong className="text-gray-900 font-bold text-sm">{post.likecount}</strong>
            <span className="text-xs font-semibold text-gray-500">Likes</span>
          </button>
          <button className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <strong className="text-gray-900 font-bold text-sm">{post.commentCount}</strong>
            <span className="text-xs font-semibold text-gray-500">Comments</span>
          </button>
        </div>

        {/* 右側：時間 */}
        <span className="text-sm font-bold text-gray-400">{timeAgo(post.updated_at)}</span>
      </div>

      {/* 3. 貼文內文區 (超大留白) */}
      <div className="px-6 py-6 min-h-[350px]">
        {post.content}
      </div>

      {/* 4. 留言輸入區 (Composer) */}
      <div className="px-6 py-4 flex items-center gap-4 border-y-2 border-gray-800 bg-white flex items-center justify-center font-bold text-gray-600">
      
        {/* 藍色發言者頭像 */}
        <div className="w-10 h-10 rounded-full bg-[var(--color-primary-900)] shrink-0 flex items-center justify-center font-bold text-[var(--color-bg)]">
            {post.username.charAt(0).toUpperCase()}
        </div>
        {/* 灰色輸入框 */}
        <div className="flex-1 bg-[var(--color-primary-50)] rounded-md py-2 flex items-start px-4">
          <textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            placeholder=""
            rows={1}
            className="w-full bg-transparent focus:outline-none text-sm text-gray-900 placeholder-gray-500 resize-none overflow-hidden"
          />
        </div>
        {/* 送出箭頭 */}
        <button className="text-black hover:text-gray-600 transition-colors shrink-0 flex items-center justify-center" onClick={handleNewCommentSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l168-95.83A16,16,0,0,0,231.87,114ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,96Z"></path>
          </svg>
        </button>
      </div>

      {/* 5. 留言列表區塊 (Comment Thread) */}
      <div className="px-6 pb-20 pt-2 flex-1 overflow-y-auto">

        {/* 模擬設計稿中的一組對話 */}
        <div className="mb-6">
          {comment.map((node) => (
              <CommentItem
                key={node.comment.id}
                node={node}
                postId={postId}
                onCommentAdded={fetchComments}
              />
          ))}
        </div>

      </div>
    </div>
  );
};

export default PostDetail;