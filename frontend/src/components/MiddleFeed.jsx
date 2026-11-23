import React from 'react';
import '../css/MiddleFeed.css';

const MiddleFeed = () => {
  // 模擬動態消息的資料陣列
  const feedPosts = [
    {
      id: 1,
      author: 'Liam Lin',
      time: '2 小時前',
      content: '文件治理系統 (Document Governance) 核心模組初步建置完成。接下來準備處理 Vue.js 前端與 Spring Boot 後端的 API 串接，還有一些權限控管的細節需要重構。',
      tags: ['#Vue', '#SpringBoot', '#SystemDesign']
    },
    {
      id: 2,
      author: 'Liam Lin',
      time: '昨天',
      content: '在 Hack The Box 針對一台新機器做測試。Nmap 掃描花了不少時間，最後透過一個已知漏洞拿下 User shell，但 Privilege Escalation 的路徑還要再找找。務實推進。',
      tags: ['#HTB', '#RedTeam', '#PenetrationTesting']
    },
    {
      id: 3,
      author: 'Liam Lin',
      time: '3 天前',
      content: '今日進度：World Gym 跑步機有氧加上核心訓練。回去繼續推進 JLPT N1 的文法進度，Tobira 第五課的句型結構有點複雜，需要多花點時間消化。',
      tags: ['#Workout', '#JLPT', '#DailyRoutine']
    }
  ];

  return (
    <div className="feed-container">
      {/* 頂部發文區塊 (讓版面結構更完整) */}


      {/* 動態消息列表 */}
      <div className="feed-list">
        {feedPosts.map((post) => (
          <div key={post.id} className="feed-card">
            <div className="feed-card-header">
              <div className="feed-card-avatar"></div>
              <div className="feed-card-meta">
                <span className="feed-author">{post.author}</span>
                <span className="feed-time">{post.time}</span>
              </div>
            </div>
            <div className="feed-card-content">
              {post.content}
            </div>
            <div className="feed-card-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiddleFeed;