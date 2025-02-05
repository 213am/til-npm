import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "./kko/kkoapi";

const Join = () => {
  const kakaologin = getKakaoLoginLink();
  return (
    <div>
      <h1>카카오 로그인</h1>
      <div>
        <Link to={kakaologin}>카카오 로그인</Link>
      </div>
    </div>
  );
};
export default Join;
