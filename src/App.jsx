import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// js 관련 글자들을 특수한 글자로 변경한다
import DOMPurify from "dompurify";

function App() {
  const [data, setData] = useState("");
  // 이미지 파일 처리(프론트에서 처리 필요)
  const imageHandler = () => {
    // console.log("이미지 처리하기");
    // 1. 현재 editor 를 찾아서 참조한다.
    // 2. js 로 <input type="file"/> 을 생성한다.
    // 3. js 로 속성을 세팅한다.
    // 4. js 로 마치 <input type="file"/> 을 클릭한 것처럼 실행한다
    // 5. js 로 "change" 이벤트를 생성해준다.
    // 6. 이벤트로 가상의 image url 을 생성한다(URL.createObjectURL)
    // 7. 참조해둔 editor 에 <img/> 태그를 밀어넣고 주소는 위의 주소로 넣는다
    // 8. 마우스 커서 위치를 조절한다.
  };

  // 모듈 활용
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
      // 이미지 관련 처리는 내가 직접 하겠다
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div>
      <h1>Editor</h1>
      <br />
      <div style={{ width: "80%", margin: "0 auto" }}>
        <form>
          <ReactQuill
            modules={modules}
            onChange={(e) => {
              setData(e);
            }}
          />
        </form>
      </div>
      <br />
      <div>
        <h2>입력중인 데이터(서버에 보내줄 글자)</h2>
        <p>{data}</p>
        {/* 아래처럼 내용을 출력하면 위험함 */}
        {/* <p dangerouslySetInnerHTML={{ __html: data }} /> */}
        {/* 최소한의 방지책 */}
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }} />
      </div>
    </div>
  );
}
export default App;
