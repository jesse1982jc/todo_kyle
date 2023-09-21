import { useState } from "react";

export default function NewTodoForm({ addTodo }) {
  const [newItem, setNewItem] = useState(""); // 設定輸入框(單一待辦事項)的狀態，預設空字串

  const handleSubmit = (e) => {
    // 防止表單預設送出
    e.preventDefault();

    // 增加判斷，假如 newItem 是空的話，就不用加進去待辦清單裡面
    if (newItem === "") return;

    // 新增 todo 功能，把 新的 todo 事項顯示到畫面上
    addTodo(newItem);

    // 清空欄位資訊
    setNewItem("");
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      {/* // 標籤及輸入框 */}
      <div className="form-row">
        <label>New Item</label>
        <input
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          type="text"
          id="item"
        />
      </div>
      {/* // 按鈕 */}
      <button className="btn">Add</button>
    </form>
  );
}
