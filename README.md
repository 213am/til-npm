# Swiper 활용

## 1. 설치

```bash
npm install swiper
```

## 2. 관련문서

- https://swiperjs.com/demos

## 3. 예제

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slide.css";

function App() {
  return (
    <div>
      <h1>Swiper</h1>
      <div className="visual-slide">
        <Swiper className="sw-visual">
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
export default App;
```

```css
.visual-slide {
  position: relative;
  width: 80%;
  height: 400px;
  margin: 0 auto;
  background-color: pink;
}
.sw-visual {
  width: 100%;
  height: 100%;
}
```

```jsx
// 옵션 추가
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slide.css";
// 필요한 기본 css 와 module 확인
import "swiper/css/pagination";
import { Pagination, Keyboard } from "swiper/modules";

function App() {
  return (
    <div>
      <h1>Swiper</h1>
      <div className="visual-slide">
        <Swiper
          className="sw-visual"
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination, Keyboard]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          keyboard={{
            enabled: true,
          }}
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
export default App;
```

## 4. api 연동 Swiper 만들기

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slide.css";
// 필요한 기본 css 와 module 확인
import "swiper/css/pagination";
import { Pagination, Keyboard } from "swiper/modules";
import { useEffect, useState } from "react";

// 외부 데이터
const slideData = [
  {
    title: "뉴진스 좋아요",
    pic: "https://i.namu.wiki/i/WGsJjdq_YZ55OqLwDcVy03tPUDeuy2bFGjbv7hGdqeTxhugt9oQVd9skQTplZArzk64Id35mmLbkbcMwWEo2-g.webp",
  },
  {
    title: "뉴진스 화이팅",
    pic: "https://file2.nocutnews.co.kr/newsroom/image/2023/01/21/202301210408091762_0.jpg",
  },
  {
    title: "뉴진스 사랑해요",
    pic: "https://img.sbs.co.kr/newsnet/etv/upload/2023/08/28/30000871570_1280.jpg",
  },
];

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...slideData]);
  }, []);

  return (
    <div>
      <h1>Swiper</h1>
      <div className="visual-slide">
        <Swiper
          className="sw-visual"
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination, Keyboard]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          keyboard={{
            enabled: true,
          }}
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item.pic} alt={item.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
export default App;
```
