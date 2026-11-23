// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';

// 假設你已經刻好一個簡單的 ProfilePage，可以先引入來測試
import ProfilePage from './pages/ProfilePage'; 
import PostDetail from "./pages/PostDetailPage"

function App() {
  return (
    <Routes>
      {/* 1. 外殼：套用 MainLayout (內含 three-column-wrapper 和固定的 LeftSidebar) */}
      <Route path="/" element={<MainLayout />}>
        
        {/* 2. 當網址是預設的 "/" 時，把 HomePage (中間+右邊) 塞進 Outlet */}
        <Route index element={<HomePage />} />
        
        {/* 3. 這是之後點擊列表要跳轉的個人檔案路由，可以先寫好留著 */}
        {/* <Route path="profile/:userId" element={<ProfilePage />} /> */}
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Route>
    </Routes>
  );
}

export default App;