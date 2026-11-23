// data/messages.js
export const messages = [
  {
    id: 1,
    type: 'post',        // ← 主貼文
    authorId: 'me',
    text: '今天大晴天，正義歸來!!',
    comments: [
      {
        id: 101,
        type: 'comment',  // ← 留言
        authorId: 'other',
        text: '發雞排了啦~~',
      },
      {
        id: 102,
        type: 'comment',
        authorId: 'me',
        text: '要加辣嗎？',
      },
    ],
  },
];