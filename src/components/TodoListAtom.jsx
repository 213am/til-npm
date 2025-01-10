import { useRecoilState } from "recoil";
import { todoListAtom } from "../atoms/todoListAtom";
import { useState } from "react";
import TodoListSelector from "./TodoListSelector";

const TodoListAtom = () => {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [inputValue, setInputValue] = useState("");
  // 할일 추가
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodoList([
        ...todoList,
        { id: Date.now(), title: inputValue, completed: false },
      ]);
    }
    setInputValue("");
  };

  const deleteTodo = (e) => {
    const todos = todoList.filter((item) => item.id !== e);
    console.log(todos);
    setTodoList(todos);
  };

  const toggleTodo = (e) => {
    setTodoList(
      todoList.map((item) =>
        item.id === e ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return (
    <div>
      <h1>TodoListAtom</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button style={{ marginLeft: "10px" }} onClick={() => addTodo()}>
          추가
        </button>
        <ul>
          {/* 목록출력 */}
          {todoList.map((item) => (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
                onClick={() => toggleTodo(item.id)}
              >
                {item.title}
              </span>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteTodo(item.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <TodoListSelector />
    </div>
  );
};

export default TodoListAtom;
