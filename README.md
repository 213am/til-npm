# 카카오 소셜 로그인

- 카카오 개발자 등록 : https://developers.kakao.com
- 참고 : https://chunws13.tistory.com/63#google_vignette

## 앱 등록 과정

- 과정 1
  ![Image](https://github.com/user-attachments/assets/db94fa79-ab4b-435b-985b-2af4b993a8ba)
- 과정 2
  ![Image](https://github.com/user-attachments/assets/a073f3d0-a558-4b74-9c8b-72da5207b084)
- 과정 3 (아이콘을 꼭 넣어주자)
  ![Image](https://github.com/user-attachments/assets/b16546e4-8126-4cba-9535-d887a73f3449)
- 과정 4
  ![Image](https://github.com/user-attachments/assets/8e02fff8-e040-4c9d-ab40-37778c673517)
- 과정 5
  ![Image](https://github.com/user-attachments/assets/a30ed210-3b3a-4f8e-884a-9f5814752255)
- 과정 6
  ![Image](https://github.com/user-attachments/assets/5bcab231-c3cf-474e-8d0d-d624715c19a1)
- 과정 7

![Image](https://github.com/user-attachments/assets/091155df-35e5-4464-bad3-ff22c7d23387)

- 과정 8 (리다이렉트 주소 작성)

![Image](https://github.com/user-attachments/assets/091155df-35e5-4464-bad3-ff22c7d23387)

- 과정 9
  ![Image](https://github.com/user-attachments/assets/d74fce7f-7db1-448e-87cb-d28fb8eaabdb)
- 과정 10
  ![Image](https://github.com/user-attachments/assets/124b4069-15c2-43b0-ae41-09e59d6f0c65)
- 과정 11
  ![Image](https://github.com/user-attachments/assets/907c61d2-7405-4853-889d-438fe585649e)
- 과정 12 ( 각 키를 .env 파일에 보관해서 환경 변수로 사용 )
  ![Image](https://github.com/user-attachments/assets/625b383f-ed86-46da-939f-ee203005e833)

- 과정 13 ( 동의 항목 )
  ![Image](https://github.com/user-attachments/assets/63a64ef7-82b9-4ed5-8f92-4f4d034b27ca)
  ![Image](https://github.com/user-attachments/assets/c68d8234-5a1f-4ba6-a44a-7033baad3ac4)
  ![Image](https://github.com/user-attachments/assets/6d26ce45-b381-4b6d-88a4-19c83366c08e)

- 과정 14 (추가권한)
  ![Image](https://github.com/user-attachments/assets/62af251c-3440-4476-aa29-f0ee94c6b1c0)
  ![Image](https://github.com/user-attachments/assets/bf4b494b-6103-4959-b93c-68504df67311)
  ![Image](https://github.com/user-attachments/assets/09254d76-30b4-48a9-a8ae-2c0d08c08ae8)

<br/>

## .env 파일 작성

- Vite 프로젝트의 환경 변수는 접두어로 `VITE_` 가 필수

```env
VITE_KKO_LOGIN_REST_API_KEY=REST API 키
VITE_KKO_LOGIN_JS_API_KEY=JavaScript 키
```

<br/>

## 카카오 소셜 로그인 기능 구현

- `/src/kko` 폴더 생성
- `/src/kko/kkoapi.js` 파일 생성

```js
// REST API Key 처리
const rest_api_key = import.meta.env.VITE_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인시 토큰 API 경로
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 성공시 이동할 Router 경로
const redirect_uri = "http://localhost:3000/user";

// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

<br />

## 회원가입 페이지 구성

- `/src/Join.js` 파일 생성

```js
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
```

<br />

## 인증키를 이용한 사용자 정보 알아내기

- 카카오 인증 후 정보 파악하기 위한 컴포넌트 구성
- `/src/pages/member/After.jsx` 파일 생성

```jsx
import { useSearchParams } from "react-router-dom";

const After = () => {
  // 카카오 인증 사용자 정보 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // searchParams 에서 code 알아내기
  const authCode = URLSearchParams.get("code");

  return <div>인가키 : {authCode}</div>;
};
export default After;
```

- 카카오 인가 후 사용자정보 파악하기 위한 라우터 구성
- `/src/App.jsx` 에 추가

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import After from "./pages/member/After";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<h1>로그인 페이지</h1>} />
        <Route path="/user" element={<h1>유저 로그인 성공</h1>} />
        <Route path="/member/kko" element={<After />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
```

<br/>

## 인가 키 생성 후 Access Token 요청하기

- 인가 키 이용해서 `Access Token`을 발급받고
- 이후 `Access Token` 을 사용해 여러가지 정보를 호출
- `/src/kko/kkoapi.js` 에 기능 추가

```js
import axios from "axios";

// REST API Key 처리
const rest_api_key = import.meta.env.VITE_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인시 토큰 API 경로
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 성공 후 이동시 토큰 파악할 경로
const redirect_uri = "http://localhost:5173/member/kko";

// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// Access Token 받기 경로
const access_token_url = `https://kauth.kakao.com/oauth/token`;

export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };
  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;
  return accessToken;
};

// 토큰을 이용해서 사용자 정보 호출하기
export const getMemberWithAccessToken = async (accessToken) => {
  try {
    const response = await axios.get(kko_user_api, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
```

<br/>

## 실제 사용자 정보를 호출하기

- `/src/pages/member/After.jsx` 기능 추가
  - Access Token 발급 및 사용자 정보 출력
