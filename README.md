# 날짜를 다루는 라이브러리

- 참고사항 : [html 특수기호](https://dev-handbook.tistory.com/23)

## 1. moment

### 1.1. 설치

`npm i moment`

- [npm](https://www.npmjs.com/package/moment)
- [site](https://momentjs.com/)

### 1.2. 참조

- [활용참조](https://bolob.tistory.com/entry/JavaScript-Momentjs-%EC%82%AC%EC%9A%A9%EB%B2%95-%ED%98%84%EC%9E%AC-%EB%82%A0%EC%A7%9C-%EB%82%A0%EC%A7%9C-%ED%8F%AC%EB%A7%B7-%EB%82%A0%EC%A7%9C-%EB%B9%84%EA%B5%90)

### 1.3. 예시

```jsx
import moment from "moment";

// 서버에서 response 된 데이터로 가정
const getData = [
  {
    id: 1,
    title: "swaggr 완료",
    createAt: "2024-12-13T10:00:00Z",
  },
  {
    id: 2,
    title: "react 완료",
    createAt: "2024-12-18T10:00:00Z",
  },
];

function App() {
  const todayMoment = moment().format("YYYY-MM-DD HH:MM:ss");

  return (
    <>
      <h1>moment 활용 날짜</h1>
      <div>
        <p>오늘은 {todayMoment}</p>
        {getData.map((item) => {
          return (
            <p key={item.id}>
              아이디 : {item.id}&nbsp; 제목 : {item.title}&nbsp; 날짜 :&nbsp;
              {moment(item.createAt).format("YYYY-MM-DD")}
            </p>
          );
        })}
        <br />
        <h2>moment 를 활용한 5일 뒤 날짜 계산하기</h2>
        {getData.map((item) => {
          return (
            <p key={item.id}>
              아이디 : {item.id}&nbsp; 제목 : {item.title}&nbsp; 5일 뒤 날짜
              :&nbsp;
              {moment(item.createAt).add(5, "days").format("YYYY-MM-DD")}
            </p>
          );
        })}
        <br />
        <h2>moment 를 활용한 시간이 얼마나 지났는지?</h2>
        {getData.map((item) => {
          return (
            <p key={item.id}>
              아이디 : {item.id}&nbsp; 제목 : {item.title}&nbsp; 시간경과
              :&nbsp;
              {moment(item.createAt).fromNow()}
            </p>
          );
        })}
      </div>
    </>
  );
}
export default App;
```

## 2. Day.js

### 2.1. 설치

`npm i dayjs`

- [npm](https://www.npmjs.com/package/dayjs)
- [site](https://day.js.org/)

### 2.2. 참조

- [moment 와 dayjs 비교](https://velog.io/@hamjw0122/%EC%9A%B0%EB%A6%AC%EA%B0%80-moment.js-%EB%8C%80%EC%8B%A0-day.js%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)

- [활용 참조](https://velog.io/@hongsoom/Library-day.js-%EB%82%A0%EC%A7%9C-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)

- [plugin 참조](https://velog.io/@sunny888/react-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-dayjs%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0)

### 2.3. 예시

```jsx
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 불러오기

// 서버에서 response 된 데이터로 가정
const getData = [
  {
    id: 1,
    title: "swaggr 완료",
    createAt: "2024-12-13T10:00:00Z",
  },
  {
    id: 2,
    title: "react 완료",
    createAt: "2024-12-18T10:00:00Z",
  },
];

function App() {
  const todayDayjs = dayjs().format("YYYY-MM-DD HH:MM:ss");
  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  return (
    <>
      <h1>dayjs 활용 날짜</h1>
      <div>
        <p>오늘은 {todayDayjs}</p>
        {getData.map((item) => {
          return (
            <p key={item.id}>
              아이디 : {item.id}&nbsp; 제목 : {item.title}&nbsp; 날짜 :&nbsp;
              {dayjs(item.createAt).format("YYYY-MM-DD")}
            </p>
          );
        })}
        <br />
        <h2>dayjs 를 활용한 5일 뒤 날짜 계산하기</h2>
        {getData.map((item) => {
          return (
            <p key={item.id}>
              아이디 : {item.id}&nbsp; 제목 : {item.title}&nbsp; 5일 뒤 날짜
              :&nbsp;
              {dayjs(item.createAt).add(5, "days").format("YYYY-MM-DD")}
            </p>
          );
        })}
        <br />
        <h2>dayjs 를 활용한 시간이 얼마나 지났는지?</h2>
        {getData.map((item) => {
          return (
            <p key={item.id}>
              아이디 : {item.id}&nbsp; 제목 : {item.title}&nbsp; 시간경과
              :&nbsp;
              {dayjs(item.createAt).fromNow()}
            </p>
          );
        })}
      </div>
    </>
  );
}
export default App;
```
