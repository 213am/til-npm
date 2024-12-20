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
