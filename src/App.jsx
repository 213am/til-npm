import axios from "axios";
import { useRecoilState } from "recoil";
import { loginInfoState } from "./atoms/userInfo";
import { getCookie, removeCookie, setCookie } from "./utils/cookie";

function App() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const login = async () => {
    try {
      const res = await axios.post("/api/user/sign-in", {
        email: "dkssud123@tmails.net",
        upw: "1q2w3e4R!",
      });
      console.log(res.data.resultData);
      // recoil 에 저장
      setLoginInfo(res.data.resultData);
      // cookie 에 저장
      setCookie("accessToken", res.data.resultData.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>JWT : accessToken 만 존재</h1>
      <button onClick={() => login()}>로그인</button>
      <p>인증키 : {loginInfo?.accessToken}</p>
      <Test />
    </div>
  );
}
export default App;

function Test() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const callFn = async () => {
    try {
      //accessToken 헤더에 추가
      const accessToken = loginInfo.accessToken;
      // const accessToken = getCookie("accessToken");
      const res = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      // 만약에 인증키 만료라면
      if (res.status === 401) {
        // 인증키가 만료되었다면 후처리가 필요
        // 1. 로그아웃 후 로그인 페이지로 이동
        // removeCookie("accessToken");
        // setLoginInfo({});
        // alert("다시 로그인해주세요");
        // alert("로그인 창으로 이동");
        //
        // 2. 다시 accessToken 발급 받기
        refreshToken();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post("/api/user/access-token");
      console.log(res.data);
      setCookie("accessToken", res.data.resultData);
      setLoginInfo((prev) => ({ ...prev, accessToken: res.data.resultData }));
      // 원래 하려던 API 다시 호출
      callFn();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>테스트</h2>
      <button onClick={() => callFn()}>요청</button>
    </>
  );
}
