import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="list">
      {/* // 新增判斷 todos 陣列若為空時，顯示一行 No Todos */}
      {todos.length === 0 && "No Todos"}
      {/* // 用 map() 把 todos 一項一項取出來 */}
      {todos.map((todo) => {
        return (
          // TodoItem 組件開始
          <TodoItem
            key={todo.id}
            // 下面這三行的屬性，可以寫成這樣:
            // {...todo}
            // 直接用 展開運算子(spread operator ...)把 todo 的屬性傳過來
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />

          // TodoItem 組件結束
        );
      })}
    </ul>
  );
}
