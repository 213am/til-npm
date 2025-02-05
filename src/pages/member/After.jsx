import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";
import { useEffect, useState } from "react";

const After = () => {
  // 카카오 사용자 정보 보관
  const [userInfo, setUserInfo] = useState(null);
  // 카카오 인증 사용자 정보 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // searchParams 에서 code 알아내기
  const authCode = URLSearchParams.get("code");

  // 인가 키를 이용해서 Access Token 을 발급 받자
  const getAccessTokenCall = async () => {
    try {
      const accessKey = await getAccessToken(authCode);
      console.log(accessKey);
      const info = await getMemberWithAccessToken(accessKey);
      console.log("사용자 정보 : ", info);
      setUserInfo({ ...info });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);

  return (
    <div>
      <h1>인가키 : {authCode}</h1>
      <h2>Kakao 로그인 후 사용자 정보</h2>
      <div>
        <p> 아이디 : {userInfo?.id}</p>
        <p>닉네임 : {userInfo?.kakao_account.profile.nickname}</p>
        <p>이메일 : {userInfo?.kakao_account.email}</p>
        <p>
          사용자 사진 :{" "}
          <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
        </p>
        <p>
          취미 : <input type="text" />
        </p>
        <p>
          <button type="button">회원가입</button>
        </p>
      </div>
    </div>
  );
};
export default After;
