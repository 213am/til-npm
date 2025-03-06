import anime from "animejs";
import { useEffect, useRef } from "react";

const AnimePage = () => {
  const BoxWrap = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    height: "80vh",
    backgroundColor: "yellow",
    marginTop: "10px",
    paddingLeft: "100px",
  };

  const BoxStyle = {
    display: "flex",
    width: 100,
    height: 100,
    backgroundColor: "white",
    alignItems: "center",
  };

  // 만약 html 이었으면 querySelector(".클래스명")
  // React 이므로 useRef 로 html 태그를 참조한다.
  const boxRef = useRef(null);
  // button 에 애니메이션 효과 적용하기
  const motionA = () => {
    anime({
      targets: boxRef.current,
      width: "70%",
      translateX: [0, 0],
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: false,
    });
  };
  const motionB = () => {
    anime({
      targets: boxRef.current,
      translateX: 700,
      rotate: 540,
    });
  };
  const motionC = () => {
    anime({
      targets: boxRef.current,
      translateX: 1000,
      duration: 1200,
      easing: "easeInOutBack",
    });
  };
  // 실제 anime 적용해보기
  useEffect(() => {
    const box = boxRef.current;
  }, []);

  return (
    <div>
      <h1>AnimePage</h1>
      <div>
        <button onClick={motionA}>효과 1</button>
        <button onClick={motionB}>효과 2</button>
        <button onClick={motionC}>효과 3</button>
      </div>
      <div style={BoxWrap}>
        <div style={BoxStyle} ref={boxRef}></div>
      </div>
    </div>
  );
};
export default AnimePage;
