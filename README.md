# JWT 프로젝트 반영

- 사용자 인증은 2가지가 있습니다
- 세션 인증
- JWT 인증
- 하이브리드 세션 + JWT 인증 혼합

## 1. JWT(JSON Web Token)

- 복잡한 문자열을 서버에서 만들어서 준다

## 2. 정석 시나리오

- 사용자가 로그인을 합니다
- Response 로 2개의 값이 오는게 정석
- accessToken : 서버에서 만들어서 준다
  - api 호출시 accessToken 을 함께 보낸다
- refreshToken : 서버에서 만들어서 준다
  - api 호출시 401(CORS) : 토큰 만료
  - 토큰 만료 시 클라이언트가 보낸 refreshToken 을 서버에서 검증
  - 검증 통과 시 새로운 accessToken 을 발급해서 준다
- 2개의 값을 클라이언트가 보관(Recoil, Context, Cookie 등)

## 3. other 시나리오

- 사용자가 로그인 후
- response 로 accessToken 만 오네?
- refreshToken 이 없네...
  - 서버관리자가 15분마다 accessToken 을 만료 시키네?

### 3.1. 토큰 만료시 로그아웃 시켜서 다시 로그인을 요구하는 방법

### 3.2. 토큰 만료시 다시 accessToken 을 요청하고 다시 새로운 토큰을 발급하는 방법

## 4. 필요로 한 npm 패키지

- axios
- react-cookie
- recoil

## 5. 로그인 후 jwt 토큰 저장

```jsx
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginInfoState } from "./atoms/userInfo";
import { setCookie } from "./utils/cookie";

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
    </div>
  );
}
export default App;
```

## 6. jwt 토큰 사용

- accessToken 사용해 axios 호출하기
- aixois 호출시 header 에 Authrization 에 Bearer 로 담는다.
- 만약 401 즉, 만료가 오면
- 대응법 1 : 로그인으로 다시 이동
- 대응법 2 : 토큰 재발급 후 다시 axios 호출

```jsx
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
```
