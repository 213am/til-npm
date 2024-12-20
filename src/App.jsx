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
