import React, { useState, useEffect } from 'react';
import PostCard from "../components/PostCard"
import EmojiPicker from "emoji-picker-react";

const MainFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());   // 新增
  const [showPicker, setShowPicker] = useState(false);
  // 測試用的假資料 (API 失敗時會顯示這個)
  const fallbackPosts = [
    {
      id: 1, author: { name: "LiamLee", avatar: "https://i.pravatar.cc/150?u=4" },
      content: "今天天氣真好，剛剛把 Tailwind v4 的環境打通了，現在火力全開！🚀 曼巴精神持續燃燒。", comments: 10, likes: 25
    },
    {
      id: 2, author: { name: "Bitch Chen", avatar: "https://i.pravatar.cc/150?u=1" },
      content: "這是我設計的第二篇貼文。點擊右上角的點點點，就可以看到編輯跟刪除的選單喔！排版越來越順手了。", comments: 2, likes: 8
    },
    {
      id: 3, author: { name: "Greedy Ke", avatar: "" },
      content: "如果後端 API 沒開，你就會看到這些假資料。把 PostCard 抽離出來真的是神之決策！", comments: 15, likes: 42
    }
  ];

  const handleDelete = (postId) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  const CURRENT_USER_ID = 5;
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/posts').then(res => res.json()),
      fetch(`http://localhost:8080/api/posts/liked?userId=${CURRENT_USER_ID}`).then(res => res.json()),
    ])
      .then(([postsData, likedData]) => {
        setPosts(postsData.length > 0 ? postsData : fallbackPosts);
        setLikedIds(new Set(likedData));

        console.log("我要看到的資料", postsData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("撈貼文失敗，改用假資料呈現畫面", err);
        setPosts(fallbackPosts);
        setIsLoading(false);
      });
  }, []);
  const handleSubmit = () => {
    if (!postContent.trim()) return;

    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: CURRENT_USER_ID,
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
      .catch((err) => {
        console.error("發文錯誤:", err);
        // 為了讓你在沒有後端時也能看效果，我加上了假的 UI 樂觀新增
        const mockNewPost = {
          id: Date.now(),
          username: "Me",
          content: postContent,
          likes: 0,
          comments: 0
        };
        setPosts([mockNewPost, ...posts]);
        setPostContent('');
      });
  };
  const handleEmojiClick = (emojiData) => {
    setPostContent((prev) => prev + emojiData.emoji);
    // setShowPicker(false);   // 想選一個就關再打開這行
  };
  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 font-sans h-screen overflow-y-auto pb-24">

      {/* 1. 發文區塊 (Composer) */}
      <div className="bg-[#EAEAEA] p-4 rounded-lg shadow-md mb-10">
        <div className="bg-white border-b-2 border-gray-800 min-h-[70px] mb-3 p-2">
          <textarea
            placeholder="有什麼新鮮事？"
            className="w-full h-full resize-none focus:outline-none text-gray-800 text-sm"
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value)
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            maxLength={500}
            rows={1}

          ></textarea>
        </div>

        <div className="flex justify-between items-center px-1">
          <div className="flex gap-5">
            <div className='relative'>
              <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black transition-colors relative inline-block"
                onClick={() => setShowPicker((prev) => !prev)}
              >
                <span className="text-lg">😀</span> Emoji
              </button>
              {showPicker && (
                <div className="absolute left-0 top-full z-20 mt-1">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black transition-colors">
              <span className="text-lg">🖼️</span> Add Photo
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-400">
              {postContent.length}/500
            </span>
            <button onClick={handleSubmit} className="bg-[var(--color-primary-500)] hover:bg-indigo-500 text-white px-6 py-1.5 rounded-full font-bold text-sm shadow-sm transition-colors">
              Post
            </button>
          </div>

        </div>

      </div>

      {/* 2. 貼文列表區塊 (Post Feed) -> 簡化為呼叫 PostCard 元件 */}
      <div className="flex flex-col">
        {isLoading ? (
          <div className="text-center text-gray-500 py-10 font-bold">載入貼文中...</div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              postData={post}
              initialLiked={likedIds.has(post.id)}
              onDelete={handleDelete}    // ← 
            />
          ))
        )}
      </div>

    </div>
  );
};

export default MainFeed;