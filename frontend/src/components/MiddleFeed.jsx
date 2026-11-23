import React, { useState } from 'react';
import { MoreVertical, MessageSquare, ThumbsUp } from 'lucide-react';
import '../css/MiddleFeed.css';

// 模擬動態消息的初始資料
const initialPosts = [
  {
    id: 1,
    username: 'liamLee',
    content: '好了好了 😍',
    comments: 0,
    likes: 0,
    liked: false,
    createdAt: '2026-11-23T10:30:00',
  },
  {
    id: 2,
    username: 'liamLee',
    content: '所以可以用嗎??',
    comments: 0,
    likes: 0,
    liked: false,
    createdAt: '2026-11-23T11:15:00',
  },
  {
    id: 3,
    username: 'liamLee',
    content: '哈囉\n所以\n現在',
    comments: 1,
    likes: 1,
    liked: false,
    createdAt: '2026-11-23T12:00:00',
  },
];

// 將 ISO 時間格式化為「2026/11/23 10:30」
const formatTime = (iso) =>
  new Date(iso).toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

const MiddleFeed = () => {
  const [posts, setPosts] = useState(initialPosts);

  // 切換按讚狀態，同時更新讚數
  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
          : p
      )
    );
  };

  return (
    <div className="feed-container">
      {/* 動態消息列表 */}
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <div className="post-body">
            <header className="post-header">
              <div className="avatar" aria-hidden="true">
                {post.username.charAt(0).toUpperCase()}
              </div>
              <span className="username">{post.username}</span>
              <time className="post-time" dateTime={post.createdAt}>
                {formatTime(post.createdAt)}
              </time>
              <button
                className="more-button"
                type="button"
                aria-label="更多選項"
                title="更多選項（尚未實作）"
              >
                <MoreVertical size={18} strokeWidth={1.6} />
              </button>
            </header>
            {/* 內容有 \n 換行，需要 CSS: white-space: pre-wrap（見 .post-content） */}
            <div className="post-content">{post.content}</div>
          </div>
          <footer className="post-footer">
            <div className="action-group" aria-label={`${post.comments} 則留言`}>
              <MessageSquare size={23} strokeWidth={2.4} />
              <span>{post.comments}</span>
              <span className="action-label">Comments</span>
            </div>
            <button
              className={`action-group action-button ${post.liked ? 'liked' : ''}`}
              type="button"
              onClick={() => handleToggleLike(post.id)}
              aria-pressed={post.liked}
              aria-label={post.liked ? '取消按讚' : '按讚'}
            >
              <ThumbsUp
                size={23}
                strokeWidth={2.4}
                fill={post.liked ? 'currentColor' : 'none'}
              />
              <span>{post.likes}</span>
              <span className="action-label">Likes</span>
            </button>
          </footer>
        </article>
      ))}
    </div>
  );
};

export default MiddleFeed;
