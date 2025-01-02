import { useDispatch, useSelector } from "react-redux";
// store 에 저장된 slice 중 어떤 slice 의 action 을 사용할 지
import { add, minus, reset } from "../features/counter/counterSlice";

function Counter() {
  //  RTK 의 store 를 불러들여서 그 중 counter 를 사용하겠다
  const count = useSelector((state) => state.counter);
  // RTK 의 store 에 있는 counter 의 값을 갱신시키기 위한 dispatch
  const dispatch = useDispatch();

  return (
    <div>
      <p>count : {count}</p>
      <br />
      <button onClick={() => dispatch(add())}>증가</button>
      <button onClick={() => dispatch(minus())}>감소</button>
      <button onClick={() => dispatch(reset())}>초기화</button>
    </div>
  );
}
export default Counter;
