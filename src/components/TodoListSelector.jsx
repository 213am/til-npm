import { useRecoilValue } from "recoil";
import { completedTodosSelector } from "../selectors/todoSelector";

function TodoListSelector() {
  // 나는 todos atom 에서 completed: true 인 것만 가져오겠다
  const completedTodos = useRecoilValue(completedTodosSelector);

  return (
    <div>
      <h1>완료된 할일 목록</h1>
      <ul>
        {completedTodos.map((item) => (
          <li key={item.id} style={{ display: "flex", gap: "10px" }}>
            <div>완료 : </div>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListSelector;
