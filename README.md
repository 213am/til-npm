# Framer Motion

- [공식사이트](https://motion.dev/docs/react-quick-start)
- [공식예제](https://examples.motion.dev/react)
- [참고블로그](https://velog.io/@keumky1/Framer-Motion-입문하기)
- [참고블로그](https://nykim.work/114)

```bash
npm install framer-motion
```

## 실습하기

- `/src/pages/Framer.jsx` 파일 생성

```jsx
import { motion } from "framer-motion";
import { useState } from "react";

const Framer = () => {
  const [visible, setVisible] = useState(false);
  const [move, setMove] = useState(false);
  const [rotate, setRotate] = useState(false);

  return (
    <div>
      <div className=" flex items-center px-10 py-10 gap-5">
        <h1 className="text-3xl">Framer Motion</h1>
        <button
          onClick={() => setRotate(!rotate)}
          className="px-4 py-1 bg-blue-400 rounded-sm text-white text-base font-semibold"
        >
          실행
        </button>
      </div>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: rotate ? 510 : 0 }}
        transition={{ duration: 0.7 }}
        drag
        dragConstraints={{ left: 0, right: 500, top: -100, bottom: 500 }}
        className="flex w-48 h-48 bg-yellow-200 mt-10 mx-20 justify-center items-center"
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
```
