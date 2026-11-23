// components/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './Left'; // ✅ 修正：引入左側邊欄作為固定地基

export default function MainLayout() {
  return (
    // ✅ 沿用你原本的三欄式外殼 CSS 類別
    <div className="three-column-wrapper">
      {/* 左側邊欄固定在這裡，永遠不會動 */}
      <LeftSidebar />
      
      {/* 這裡是內容的「插座」，當網址切換時，
          會在這裡自動塞入「中間 + 右邊」的組合內容 */}
      <Outlet />
    </div>
  );
}