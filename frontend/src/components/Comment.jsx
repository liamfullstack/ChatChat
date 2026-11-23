import React, { useState } from 'react';
import send_Icon from '../assets/send.svg';
import close_Icon from '../assets/Vector.svg';
function Comment({ comment, postId, onCommentAdded, depth=0 }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const [isCollapsed, setIsCollapsed] = useState(depth > 1)

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      console.log("我要看一下comment",comment.comment);
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: replyText,
          parentId: comment.comment.id
        })
      });

      if (!response.ok) {
        throw new Error('回覆失敗');
      }

      setReplyText('');
      setIsReplying(false);
      onCommentAdded();
    } catch (err) {
      console.error(err);
    }
  };

  const hasChildren = comment.children && comment.children.length > 0;

  return (
    <div className="comment-item">
      <div className="comment-avatar"></div>
      <div className="comment-content">
        
        <div className="comment-username">{comment.comment.username}</div>
        <div className='comment-block'>
        <div className="comment-text">{comment.comment.content}</div>
        </div>

        <div className='comment-reply'>
        {!isReplying&&(
            <button
                className="comment-reply-btn"
                onClick={() => setIsReplying(!isReplying)}
                >
                回覆
        </button> 
        )}
        {isReplying && (
             <button className="comment-reply-btn"
                onClick={()=> setIsReplying(!isReplying)}>
            收回
        </button>
        )}
       
        </div>
      

        

        {isReplying && (
          <div className="reply-input-bar">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="輸入回覆..."
            />
            <div onClick={handleReplySubmit}><img src={send_Icon} class="send-btn"/></div>
          </div>
        )}

        {hasChildren && isCollapsed && (
          <button className='comment-toggle-btn'
          onClick={ () => setIsCollapsed(false)}
          >
            查看 {comment.children.length}則回覆

          </button>
        )}

        {hasChildren && !isCollapsed && (
          <>
            {depth >= 1 && (
              <button
                className="comment-toggle-btn"
                onClick={() => setIsCollapsed(true)}
              >
                收合
              </button>
            )}
            <div className="comment-children">
              {comment.children.map((childNode) => (
                <Comment
                  key={childNode.comment.id}
                  comment={childNode}
                  postId={postId}
                  onCommentAdded={onCommentAdded}
                  depth={depth + 1}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;