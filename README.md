# react-icons

## 1. 설치

`npm i react-icons`

- [npm](https://www.npmjs.com/package/react-icons)
- [site](https://react-icons.github.io/react-icons/)

## 2. 참조

- [참고 블로그](https://velog.io/@chaevivi/React-React-Icons-%EC%82%AC%EC%9A%A9%EB%B2%95)

## 3. 예시

```jsx
import { FaStar } from "react-icons/fa6";

function App() {
  const point = 5; // 총 별점
  const rate = 3; // 별점

  return (
    <>
      <div>
        <FaStar style={{ color: "gold", fontSize: 200 }} />
        star rate
      </div>
      <h1>당신의 별점은?</h1>
      <div>
        {[...Array(point)].map((item, index) => {
          return (
            <FaStar
              key={index}
              style={{ fontSize: 50, color: index < rate ? "yellow" : "grey" }}
            />
          );
        })}
      </div>
    </>
  );
}
export default App;
```
