# Redux Tool Kit ( RTK )

- 전역 상태(즉, Context) 를 관리하는 `상태관리도구`
  : Context API ( React 내장 )
  : Redux, Redux Toolkit, Recoil, Zustands

## 관련 사이트

- [site-ko](https://ko.redux.js.org/introduction/getting-started/)
- [site-en](https://redux.js.org/)
- [npm](https://www.npmjs.com/package/redux)

## 레퍼런스 사이트에서 RTK 를 추천

Redux Toolkit - `npm install @reduxjs/toolkit`

Redux 코어 - `npm install redux`
React-Redux - `npm i react-redux`

## RTK 의 기본 예제 ( `순서를 준수`하자 )

- 학습순서는 `무조건 순서대로` 하셔야 합니다
- 폴더구조, 파일명 등...
  <br/>
- `src/store` 폴더 생성 ( 전역 state 보관장소 )
  : `store.js`

  ```jsx
  import { configureStore } from "@reduxjs/toolkit";

  // store 설정
  // store 는 전역에서 사용할 state 를 말합니다.
  // 회사에서는 /src/store 폴더를 주로 생성합니다.
  // store 는 1개만 만들 수 있습니다.
  // 즉, 전역 state 는 1개만 만들 수 있습니다.
  // 파일명은 주로 store.js 라고 붙입니다.

  const store = configureStore({
    reducer: {
      // store 를 쪼개서 즉, slice 해서 사용합니다
    },
  });
  ```

- `src/features/counter` 폴더 생성
  : `counterSlice.js`

  ```jsx
  import { createSlice } from "@reduxjs/toolkit";

  const initialState = { count: 0 };

  // 코딩 컨벤션
  // Slice 는 store 를 쪼개서 사용한다는 의미
  const counterSlice = createSlice({
    // Slice 구분 이름
    name: "counterSlice",
    // Slice 초기 값
    initialState: initialState,
    // store/counterSlice 에 저장된 값 갱신하는 함수
    reducers: {
      add: (state) => {
        state.count += 1;
      },
      minus: (state) => {
        state.count -= 1;
      },
      reset: (state) => {
        state.count = 0;
      },
    },
  });

  // Reduce 함수를 외부로 내보내서 dispatch 해주도록
  // action : type 의 구분, payload 전달
  export const { add, minus, reset } = counterSlice.actions;
  export default counterSlice.reducer;
  ```

- `src/store/store.js`
  : slice 로 만든 reducer 배치

```jsx
import { configureStore } from "@reduxjs/toolkit";
// 카운터용 Reducer 활용
import counterReducer from "../features/counter/counterSlice";

// store 설정
// store 는 전역에서 사용할 state 를 말합니다.
// 회사에서는 /src/store 폴더를 주로 생성합니다.
// store 는 1개만 만들 수 있습니다.
// 즉, 전역 state 는 1개만 만들 수 있습니다.
// 파일명은 주로 store.js 라고 붙입니다.

const store = configureStore({
  reducer: {
    // store 를 쪼개서 즉, slice 해서 사용합니다
    counter: counterReducer,
  },
});
```

- `src/components/Counter.jsx` 파일 생성

```jsx
import { useDispatch, useSelector } from "react-redux";
// store 에 저장된 slice 중 어떤 slice 의 action 을 사용할 지
import { add, minus, reset } from "../features/counter/counterSlice";

function Counter() {
  //  RTK 의 store 를 불러들여서 그 중 counter 를 사용하겠다
  const count = useSelector((state) => state.counter.value);
  // RTK 의 store 에 있는 counter 의 값을 갱신시키기 위한 dispatch
  const dispatch = useDispatch();

  return (
    <div>
      <p>count : {count}</p>
      <br />
      <button onClick={() => dispatch(add())}>증가</button>
      <button onClick={() => dispatch(minus())}>감소</button>
      <button onClick={() => dispatch(reset())}>초기화</button>
    </div>
  );
}
export default Counter;
```

- `src/App.jsx` 에 Provider 셋팅(`전역 store 접근`)

```jsx
import { Provider } from "react-redux";
import Counter from "./components/Counter";
import store from "./store/store";

function App() {
  return (
    // 전역 store 를 활용
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
export default App;
```
