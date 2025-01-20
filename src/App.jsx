import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import jwtAxios from "./apis/jwt";
import { removeCookie, setCookie } from "./utils/cookie";
import { userInfo } from "./atoms/userInfo";

function App() {
  const [user, setUser] = useRecoilState(userInfo);

  const loginApi = async () => {
    try {
      // 여기는 일반 axios 로 로그인을 하고 jwt 를 발급
      const res = await axios.get("/api/user/access-token");
      // 성공시 jwt 키를 쿠키에 저장
      setCookie("accessToken", res.data.resultData);
      // 사용자 정보를 App 전체에서 접근 가능하도록 저장
      // useRecoilState 를 사용해서 저장
      console.log(res.data);
    } catch (error) {
      console.log(error);
      // 실패시 jwt 를 쿠키에서 삭제
      removeCookie("accessToken");
    }
  };
  useEffect(() => {
    loginApi();
  }, []);

  // jwt 인증키를 반드시 필요로 하는 axios 호출
  const userInfoHandler = async () => {
    try {
      const res = await jwtAxios.get("/api/user");
      console.log(res.data);
      // Recoil 에 저장된 사용자 정보를 업데이트
      setUser({ ...res.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={userInfoHandler}>jwt 를 활용한 호출</button>
    </>
  );
}

export default App;
