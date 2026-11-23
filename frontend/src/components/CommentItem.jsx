import React, { useState } from 'react';

const CommentItem = ({ node, postId, onCommentAdded, isReply = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);   // 回覆框開關
  const [replyText, setReplyText] = useState('');        // 回覆內容
  const [isSending, setIsSending] = useState(false);

  const comment = node.comment;
  const replies = node.children || [];
  const hasReplies = replies.length > 0;

  // 送出回覆
  const handleReplySubmit = async () => {
    if (!replyText.trim() || isSending) return;
    setIsSending(true);
    try {
      console.log("Comment長怎樣:",comment);
      console.log("Post ID:",postId);
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: replyText,
          parentId: comment.id,    // ← 關鍵:回覆掛在這則留言底下
        }),
      });
      if (!response.ok) throw new Error('回覆送出失敗');

      setReplyText('');
      setIsReplying(false);
      onCommentAdded?.();          // ← 通知 PostDetail 重新撈留言
    } catch (err) {
      console.error(err);
      alert('回覆失敗，請稍後再試');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`flex gap-3 ${isReply ? 'ml-12 mt-2' : 'mt-6'}`}>
      <div className={`${isReply ? 'w-8 h-8' : 'w-10 h-10'} rounded-full shrink-0 bg-[var(--color-primary-900)] mt-1 flex items-center justify-center font-bold text-[var(--color-bg)]`}>
         {comment.username ? comment.username.charAt(0).toUpperCase() : '?'}

      </div>
      
      <div className="flex-1 font-sans">
        <div className="bg-[var(--color-primary-100)] rounded-lg px-4 py-3 min-h-[60px]">
          <div className="font-serif text-gray-900 text-[15px] mb-1">{comment.username}</div>
          <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
        </div>

        {/* 操作列 */}
        <div className="flex gap-4 mt-2 ml-2 text-[13px] font-bold text-gray-500">
          <button className="hover:text-gray-800 transition-colors">讚</button>
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="hover:text-gray-800 transition-colors"
          >
            回覆
          </button>
          {hasReplies && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:text-gray-800 transition-colors"
            >
              {isExpanded ? '— 收合回覆' : `— 展開 ${replies.length} 則回覆`}
            </button>
          )}
        </div>

        {/* 回覆輸入框:點回覆才出現 */}
        {isReplying && (
          <div className="flex items-start gap-2 mt-2 ml-2">
             <textarea
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            placeholder={`回覆 ${comment.username}...`}
            rows={1}
            autoFocus
            className="flex-1 bg-[#D9D9D9] rounded-md py-2 px-3 text-sm focus:outline-none resize-none overflow-hidden"
          />
            <button
              onClick={handleReplySubmit}
              disabled={isSending}
              className="text-sm font-bold text-[#9A8cFF] hover:text-indigo-500 disabled:opacity-50"
            >
              {isSending ? '送出中' : '送出'}
            </button>
          </div>
        )}

        {/* 子留言遞迴 */}
        {hasReplies && isExpanded && (
          <div>
            {replies.map((childNode) => (
              <CommentItem
                key={childNode.comment.id}
                node={childNode}
                postId={postId}              // ← 往下傳
                onCommentAdded={onCommentAdded} // ← 往下傳
                isReply={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;