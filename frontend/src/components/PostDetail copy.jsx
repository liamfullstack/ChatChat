import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import '../css/PostDetail.css';
import leftArrow_Icon from '../assets/icons8-left-arrow-64.png';
import comment from '../assets/comment.svg'

function PostDetail() {
  const { postId } = useParams();
  const param = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  


  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (!response.ok) throw new Error('留言載入失敗');
      const data = await response.json();
    //   console.log("Tree的Data長怎樣:",data);
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

  useEffect(() => {
  console.log("✅ isLoading 更新後變成：", isLoading);
    }, [isLoading]);

  const handleNewCommentSubmit = async () => {
    if (!newCommentText.trim()) return;

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newCommentText,
          parentId: null
        })
      });

      if (!response.ok) throw new Error('留言送出失敗');

      setNewCommentText('');
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="post-detail-page">載入中...</div>;
  }

  if (error) {
    return (
      <div className="post-detail-page">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>返回上一頁</button>
      </div>
    );
  }

  return (
    <div className="post-detail-page">

      <div className="post-details">
        <div className='upbar'>
          <img src={leftArrow_Icon} className='ArrowIcon' onClick={() => navigate(-1)} />
          <div className="personalData">
            <div style={{ padding: '20px 20px 0', fontWeight: 'bold' }}>
              {post.username}
            </div>
          </div>
        </div>
        <div className="post-body1">
          {post.content}
          
        </div>
        
      </div>
     
      <div className="comments-section">
     
        <div className="comment-input-bar">
           <div className='comment-count'>
        <img src={comment}></img>
        <div className='comment-count-real'>{post.commentCount}</div>
      </div>
          <input
            type="text"
            placeholder="留言"
            className="comment-input"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button className="comment-send-btn" onClick={handleNewCommentSubmit}>➤</button>
        </div>

        <div className="comment-list">
          {comments.map((node) => (
            <Comment
              key={node.comment.id}
              comment={node}
              postId={postId}
              onCommentAdded={fetchComments}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;