# react-quill

- 참고(WYSIWYG Editor)
  : react-quill, CKEditor, Toast Editor, Tiptab

## 설치

`npm i react-quill`
`npm i quill`

- [site](https://quilljs.com/docs/quickstart)
- [npm](https://www.npmjs.com/package/react-quill)

## 실습

- App.jsx

```jsx
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function App() {
  const [data, setData] = useState("");

  return (
    <div>
      <h1>Editor</h1>
      <br />
      <div style={{ width: "80%", margin: "0 auto" }}>
        <form>
          <ReactQuill
            theme="snow"
            onChange={(e) => {
              setData(e);
            }}
          />
        </form>
      </div>
      <br />
      <div>
        <h2>입력중인 데이터</h2>
        <p>{data}</p>
      </div>
    </div>
  );
}
export default App;
```

## `크로스 사이트 스크립트 공격` 가능성이 있다

- `XSS` 위험이 존재함
- 이를 방지하기 위한 라이브러리 설치가 필요
  : [npm](https://www.npmjs.com/package/dompurify)
  : `npm i dompurify`

```jsx
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// js 관련 글자들을 특수한 글자로 변경한다
import DOMPurify from "dompurify";

function App() {
  const [data, setData] = useState("");

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
```

## 툴바 옵션 적용

```jsx
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
  },
};

<ReactQuill modules={modules} />;
```

## 이미지 처리

- 이미지는 프론트엔드에서 직접 파일을 백엔드로 전송한다
