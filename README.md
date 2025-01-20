# react cookie 설치

`npm i react-cookie`

- 웹 브라우저에 보관(저장 기간이 설정 가능한 데이터)
  <br />

# JWT(JSON Web Token)

- 웹에서 사용되는 JSON 형식의 토큰에 대한 표준 규격
- 많은 회사가 JWT를 사용하고 있음
- 하지만, 반드시 사용하는 것은 아님
- Token : 아주 길고 복잡한 문자열을 말함

 <br />

## JWT 에는 필수적으로 2가지 종류가 있습니다

### 1. Access Token

- API 요청 시(axios, fetch 등) 활용
- API 요청 시 Access Token 을 내용으로 포함하여 요청
- 모든 호출에 Access Token 이 필요한 것은 아님(비회원 사용자 기능)

### 2. Refresh Token

- JWT 인증키를 발급 시 유효기간을 설정
- 기본적으로 30분을 인증 기간으로 설정
- 필요에 의해서 2시간, 10시간, 3일 등 다양하게 설정 가능

<br />

## Proxy 설정하기

- `vite.config.js` 내용 추가

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "URL 주소",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

## JWT 용 Axios 설정하기

- 모든 백엔드 연동에서 반드시 JWT 를 사용하는 것은 아님

### 1. JWT 없이 사용하는 axios

- 로그인 API
  : 로그인 성공시 `JWT` 를 발급
  : 발급된 access token 을 cookie 또는 localStorage 에 보관
  : recoil, useState, context API 에 보관하면 안됨(새로고침 시 사라짐)
  : `/src/apis` 폴더 생성
  : - `fetch.js` 파일 생성

### 2. JWT 가 필요한 axios

- `/src/apis/jwt.js` 파일 생성
- interceptors 설정
- 통상 Request 하기전에 처리
  : Request 한 이후 jwt 인증 통과 못한 에러 처리
- 통상 Response 하기전에 처리
  : Response 한 이후 jwt 인증 통과 못한 에러 처리

```js
import axios from "axios";

const jwtAxios = axios.create();

// axios 호출 시 사전 옵션을 설정
// request 옵션 설정
const beforeReq = (config) => {
  console.log("1. 요청 전에 먼저 전달", config);
  return config;
};
const failReq = (err) => {
  console.log("요청 실패 : failReq", err);
  return Promise.reject(err);
};

// response 옵션 설정
const beforeRes = (res) => {
  console.log("2. 요청 결과 전처리", res);
  return res;
};
const failRes = (err) => {
  console.log("응답 실패 : failRes", err);
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, failRes);
export default jwtAxios;
```

## JWT 쿠키에 보관하기

- 쿠키를 위한 파일 생성

- `/src/utils` 폴더 생성
- `/src/utils/cookie.js` 파일 생성

```js
import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키에 데이터 저장하기
export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

// 쿠키에서 데이터 가져오기
export const getCookie = (name) => {
  return cookies.get(name);
};

// 쿠키에서 데이터 삭제하기
export const removeCookie = (name) => {
  return cookies.remove(name, { path: "/" });
};
```

## jwt 쿠키에 보관하는 과정

- 일반 axios 로 로그인 시도

```jsx
import { useEffect } from "react";
import axiosInstance from "./apis/fetch";
import { removeCookie, setCookie } from "./utils/cookie";

function App() {
  const loginApi = async () => {
    try {
      // 여기는 일반 axios 로 로그인을 하고 jwt 를 발급
      const res = await axiosInstance.get("/api/user/access-token");
      // 성공시 jwt 키를 쿠키에 저장
      setCookie("accessToken", res.data.resultData);
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
  return (
    <>
      <button>jwt 를 활용한 호출</button>
    </>
  );
}

export default App;
```

- jwt 인증키를 넣어야 하는 경우

```js
import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

const jwtAxios = axios.create();
// axios 호출 시 사전 옵션을 설정

// 백엔드로 Request 요청 시 사전 옵션을 설정
const beforeReq = (config) => {
  // console.log("1. 요청 전에 먼저 전달", config);
  // 1. 먼저 쿠키를 읽어온다
  const accessToken = getCookie("accessToken");
  // 2. 인증키가 없는 경우
  if (!accessToken) {
    // 에러 메세지를 출력
    return Promise.reject({
      response: { data: { error: "로그인 후 다시 시도해주세요" } },
    });
  }
  // 3. 인증키가 있는 경우
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
const failReq = (err) => {
  console.log("요청 실패 : failReq", err);
  return Promise.reject(err);
};
jwtAxios.interceptors.request.use(beforeReq, failReq);

// response 옵션 설정
const beforeRes = async (res) => {
  // console.log("2. 요청 결과 전처리", res);
  // 결과가 정상적으로 오면 혹시 모를 jwt 키 변경을 위해 처리가 필요
  // accessToken 을 새롭게 호출하고 다시 저장해준다
  const result = await axios.get("/api/user/access-token");
  setCookie("accessToken", result.data.resultData);
  return res.config;
};
const failRes = async (err) => {
  // console.log("응답 실패 : failRes", err);
  try {
    const result = await axios.get("/api/user/access-token");
    setCookie("accessToken", result.data.resultData);
    return Promise.reject(err);
  } catch (error) {
    console.log(error);
  }
};
jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;
```

## 사용자 정보 recoil 에 보관하기

- 사용자 로그인 API 연동 후 정보 저장
- `/src/atoms` 폴더 생성
- `/src/atoms/userInfo.js` 파일 생성

```js
import { atom } from "recoil";

export const userInfo = atom({
  Key: "userInfo",
  default: {
    name: "",
    phone: "",
    birth: "",
    nickName: "",
  },
});
```

- Recoil 은 App.jsx 또는 main.jsx 에서 설정

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```
