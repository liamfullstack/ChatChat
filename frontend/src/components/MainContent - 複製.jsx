import React, { useState, useEffect } from 'react';
import '../css/MainContent.css';
import PostCard from '../components/PostCard';

function MainContent() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postContent, setPostContent] = useState('');

  // ✅ 暫定區域變數，之後接 JWT 再換掉這一行就好
  const currentUserId = 5;

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("撈貼文失敗", err);
        setIsLoading(false);
      });
  }, []); // ✅ 沒有依賴 userId 了，所以空陣列即可

  const handleSubmit = () => {
    if (!postContent.trim()) return;

    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: currentUserId, // ✅ 用區域變數
        content: postContent,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('發文失敗');
        return res.json();
      })
      .then((newPost) => {
        setPosts([newPost, ...posts]);
        setPostContent('');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main-content">
      <div className="post-composer-large">
        <textarea
          className="post-textarea"
          placeholder="有什麼新鮮事？"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <div className="toolbar-row">
          <div className="toolbar-icon">😊</div>
          <div className="toolbar-icon">🖼️</div>
          <div className="toolbar-input-grey"></div>
          <div className="toolbar-submit" onClick={handleSubmit}>💬</div>
        </div>
      </div>

      <div className="post-list">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>資料載入中...</div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} postData={post} />
          ))
        )}
      </div>
    </div>
  );
}

export default MainContent;