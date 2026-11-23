import React, { useState } from "react";

const NewStoneModal = ({ isOpen, onClose, onCreated }) => {
    const [eventTime, setEventTime] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setError("");

        if (!eventTime) {
            setError("請選擇時間");
            return;
        }
        if (!description.trim()) {
            setError("請填寫內容");
            return;
        }

        const payload = { event_time: eventTime, description: description.trim() };

        setSubmitting(true);
        try {
            // 接後端時打開這段：
            const res = await fetch("/api/stone", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-User-Id": 1,
              },
              body: JSON.stringify(payload),
            });

            console.log("狀態多少", res.status);

           
            if (!res.ok) throw new Error("建立失敗");
            const stone = await res.json();
             console.log("測試資料", stone);
            // ---- 預覽用：模擬成功 ----
            // await new Promise((r) => setTimeout(r, 500));
            // const stone = { id: Date.now(), user_id: 1, ...payload };
            // -------------------------

            onCreated && onCreated(stone);
            setEventTime("");
            setDescription("");
            onClose();
        } catch (e) {
            setError("建立失敗，請稍後再試");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        // 半透明遮罩，點背景關閉
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            {/* 卡片本體，擋掉冒泡避免點到內容也關閉 */}
            <div
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 標題列 */}
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">New Stone</h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        aria-label="關閉"
                    >
                        ✕
                    </button>
                </div>

                {/* 時間 */}
                <label className="mb-4 block">
                    <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                        時間
                    </span>
                    <input
                        type="date"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#78716C] focus:ring-1 focus:ring-[#78716C]"
                    />
                </label>

                {/* 內容 */}
                <label className="mb-2 block">
                    <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                        內容
                    </span>
                    <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="例如：拿到 OSCP 證照"
                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#78716C] focus:ring-1 focus:ring-[#78716C]"
                    />
                </label>

                {/* 錯誤訊息 */}
                {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

                {/* 按鈕列 */}
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
                    >
                        取消
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="rounded-lg bg-[#78716C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#57534E] disabled:opacity-60"
                    >
                        {submitting ? "建立中…" : "建立"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewStoneModal