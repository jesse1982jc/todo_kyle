import { useEffect, useState } from "react";
import "./Styles.css";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

export default function App() {
  // 取得 localStorage 的資料
  // 使用 getItem 取得，要先用 localStorage 用 key 取 -> 再用 JSON.parse 解析
  const getInitialTodosData = () => {
    const data = JSON.parse(localStorage.getItem("ITEMS"));

    // 假如 localStorage 無資料，就回傳空陣列 []，否則回傳 data
    if (!data) return [];

    return data;
  };

  const [todos, setTodos] = useState(getInitialTodosData); // 設定待辦清單(一群清單)的狀態，預設是一個空陣列

  // 用 useEffect() 設定當 [todos] 陣列有變動，就寫進去 localStorage 裡
  // setItem 存資料要成雙成對 key, value，記得要先轉成 JSON.stringify()，再做 localStorage.setItem("key", value...)
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  // 新增 todo 功能，把 新的 todo 事項顯示到畫面上
  const addTodo = (newItem) => {
    setTodos((currentTodos) => {
      return [
        // 更新一整個陣列 (所有待辦清單，包含每一個清單的所有屬性)
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
  };

  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          // 更新 "單筆" 資料的所有屬性，所以要 ...todo
          return { ...todo, completed };
        }
        // 如果 id 不對，就不更新 todo 的該筆資料的所有屬性
        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    // 用 filter() 篩選濾掉 id 自己，取出其他的 todo
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      {/* // NewTodoForm 表單開始 */}
      <NewTodoForm addTodo={addTodo} />
      {/* // NewTodoForm 表單結束 */}
      <h1 className="header">Todo List</h1>
      {/* // TodoList 清單開始 */}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      {/* // TodoList 清單結束 */}
    </>
  );
}
