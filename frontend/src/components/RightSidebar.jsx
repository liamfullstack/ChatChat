import React, { useState, useEffect } from 'react';
import TimelineItem from "../components/timline"
import NewStoneModal from "../components/NewStoneModal"






// ==========================================
// 2. 右側邊欄主元件 (RightSidebar)
// ==========================================
const RightSidebar = () => {
  const [open, setOpen] = useState(false);
  const [stones, setStones] = useState([]);

  useEffect(() => {
    const fetchStones = async () => {
      try {
        const res = await fetch("/api/stone", {
          headers: { "X-User-Id": 1 },
        });
        if (!res.ok) throw new Error(`讀取失敗 HTTP ${res.status}`);
        const data = await res.json();
        setStones(data);
      } catch (e) {
        console.error("讀取歷程失敗:", e);
      }
    };

    fetchStones();
  }, []);


const handleDelete = async (stoneId) => {
  try {
    const res = await fetch(`/api/stone/${stoneId}`, {
      method: "DELETE",
      headers: { "X-User-Id": 1 },
    });

    // 後端刪成功回 204，找不到回 404
    if (!res.ok) throw new Error(`刪除失敗 HTTP ${res.status}`);

    // 從畫面上移除這一筆（過濾掉被刪的 id）
    setStones((prev) => prev.filter((s) => s.id !== stoneId));
  } catch (e) {
    console.error("刪除失敗:", e);
  }
};

  return (
    <div className="w-full max-w-sm p-6 pt-10 font-sans min-h-screen">

      {/* 頂部標題與按鈕區 */}
      <div className="flex justify-between items-center mb-8 pr-2">
        <h3 className="font-bold text-gray-900 text-[15px] tracking-wide">
          Education & Work Experience
        </h3>
        <button className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-800)] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          onClick={() => setOpen(true)}
        >
          New Stone
        </button>
      </div>

      {/* 時間軸列表 */}
      <div className="pl-2">
        {stones.length === 0 && (
          <p className="text-sm text-gray-400">
            還沒有紀錄，點右上角 New Stone 試試。
          </p>
        )}

        {stones.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            id={exp.id}                          // ← 多傳 id，刪除時要用
            date={exp.event_time?.split("T")[0]}
            title={exp.description}
            isLast={index === stones.length - 1}
            onDelete={handleDelete}              // ← 把刪除函式傳下去
          />
        ))}
      </div>

      <NewStoneModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreated={(stone) => setStones((prev) => [stone, ...prev])}
      />

    </div>
  );
};

export default RightSidebar;