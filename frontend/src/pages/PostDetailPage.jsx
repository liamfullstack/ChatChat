// src/pages/ProfilePage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostDetail from "../components/PostDetail"
import RightSidebar from '../components/RightSidebar';
export default function ProfilePage() {
  // 1. 使用 useParams 抓取網址上的參數（名稱要跟 App.jsx 設定的 :userId 一致）
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <>
       <PostDetail />
      <RightSidebar/>

    </>
  );
}