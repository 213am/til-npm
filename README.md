# Axios 를 이용한 파일과 json 데이터 업로드

```jsx
import axios from "axios";

const App = () => {
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      // 보내야하는 데이터
      const sendData = {
        email: "1234park@naver.com",
        upw: "1111",
        name: "홍길동",
        phone: "01012345678",
      };
      // 문자열을 파일로 만들어서 보내야 함
      formData.append(
        "p",
        new Blob([JSON.stringify(sendData)], { type: "application/json" }),
      );
      if (file) {
        formData.append("pic", file);
      }

      const res = await axios.post("/api/user/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>File 및 json 데이터 post 테스트</h1>
      <button onClick={() => handleSubmit()}>업로드</button>
    </div>
  );
};

export default App;
```
