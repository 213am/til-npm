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
