// src/pages/HomePage.jsx
import React from 'react';
import MainContent from '../components/MainContent';
import RightSidebar from '../components/RightSidebar';

export default function HomePage() {
  return (
    // 使用空標籤包住，確保外層的 three-column-wrapper CSS 佈局不會跑位
    <>
      <MainContent />
      <RightSidebar />
    </>
  );
}