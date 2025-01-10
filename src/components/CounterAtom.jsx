import { useRecoilState } from "recoil";
import { counterAtom, loginAtom } from "../atoms/counterAtom";

const CounterAtom = () => {
  const [count, setConunt] = useRecoilState(counterAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);

  return (
    <div>
      <h1>로그인 상태 : {isLogin ? "로그인 성공" : "로그아웃 상태"}</h1>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "로그아웃" : "로그인"}
      </button>
      <br />
      <br />
      <h1>CounterAtom : {count}</h1>
      <button onClick={() => setConunt(count + 1)}>증가</button>
      <button onClick={() => setConunt(count - 1)}>감소</button>
      <button onClick={() => setConunt(0)}>초기화</button>
    </div>
  );
};

export default CounterAtom;
