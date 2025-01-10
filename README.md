# Recoil

[website](https://recoiljs.org/ko/)
[npm](https://www.npmjs.com/package/recoil)

- 장점 : context state 관리가 참 쉽다
- 단점 : 업데이트가 없다

`npm i recoil`
<br/>

## 코딩 컨벤션

- `/src/atoms` 폴더 생성
  : `/src/states` 폴더 생성을 하는 경우도 있음

- `/src/selectors` 폴더 생성
  : 해당 폴더는 만들지 않기도 함
  <br/>

## 기초 코드

### 1. atoms 폴더에 atom 파일 만들기

- atom 은 각각의 state 를 정의하는 것
- `/src/atoms/counterAtom.js` 파일 생성

```js
import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", // state 를 구분하는 키
  default: 0, // 초기값
});

export const loginAtom = atom({
  key: "loginAtom",
  default: false,
});
```

- `main.jsx` 에 `RecoilRoot` 설정

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

- `components/CounterAtom.jsx` 활용

```jsx
import { useRecoilState } from "recoil";
import { counterAtom, loginAtom } from "../atoms/counterAtom";

const CounterAtom = () => {
  const [count, setConunt] = useRecoilState(counterAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);

  return (
    <div>
      <h1>로그인 상태 : {isLogin ? "로그인 성공" : "로그아웃 상태"}</h1>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "로그아웃" : "로그인"}
      </button>
      <h1>CounterAtom : {count}</h1>
      <button onClick={() => setConunt(count + 1)}>증가</button>
      <button onClick={() => setConunt(count - 1)}>감소</button>
      <button onClick={() => setConunt(0)}>초기화</button>
    </div>
  );
};

export default CounterAtom;
```

## 응용예제(Todo)

- `/src/atoms/TodoListAtom.js` 파일 생성

```js
import { atom } from "recoil";

export const todoListAtom = atom({
  key: "todoListAtom", // atom 구분하는 키
  default: [], // todoList 를 담을 기본 배열
});
```

- `/src/components/TodoListAtom.jsx` 활용예

```jsx
import { useRecoilState } from "recoil";
import { todoListAtom } from "../atoms/todoListAtom";
import { useState } from "react";

const TodoListAtom = () => {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [inputValue, setInputValue] = useState("");
  // 할일 추가
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodoList([
        ...todoList,
        { id: Date.now(), title: inputValue, completed: false },
      ]);
    }
    setInputValue("");
  };

  const deleteTodo = (e) => {
    const todos = todoList.filter((item) => item.id !== e);
    console.log(todos);
    setTodoList(todos);
  };

  const toggleTodo = (e) => {
    setTodoList(
      todoList.map((item) =>
        item.id === e ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return (
    <div>
      <h1>TodoListAtom</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button style={{ marginLeft: "10px" }} onClick={() => addTodo()}>
          추가
        </button>
        <ul>
          {/* 목록출력 */}
          {todoList.map((item) => (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
                onClick={() => toggleTodo(item.id)}
              >
                {item.title}
              </span>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteTodo(item.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoListAtom;
```

### Selector 를 이용한 데이터 변경 및 필터링 작업

- `/src/selectors/todoSelector.js` 파일 생성

```js
import { selector } from "recoil";
import { todoListAtom } from "../atoms/todoListAtom";
// Recoil 에서 관리하는 데이터에서
// 완료된 항목만 필터링해서 출력해 보기
export const completedTodosSelector = selector({
  key: "completedTodosSelector",
  get: ({ get }) => {
    const todos = get(todoListAtom);
    return todos.filter((item) => item.completed);
  },
});
```

- `/src/components/TodoListSelector.jsx` 활용

```jsx
import { useRecoilValue } from "recoil";
import { completedTodosSelector } from "../selectors/todoSelector";

function TodoListSelector() {
  // 나는 todos atom 에서 completed: true 인 것만 가져오겠다
  const completedTodos = useRecoilValue(completedTodosSelector);

  return (
    <div>
      <h1>완료된 할일 목록</h1>
      <ul>
        {completedTodos.map((item) => (
          <li key={item.id} style={{ display: "flex", gap: "10px" }}>
            <div>완료 : </div>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListSelector;
```

## 응용예제(쇼핑몰 장바구니)

### atoms

- `src/atoms/cartAtoms.js`

```js
import { atom } from "recoil";

export const cartAtom = atom({
  key: "cartState",
  default: [],
});
```

- `src/atoms/productAtoms.js`

```js
import { atom } from "recoil";

export const productAtom = atom({
  key: "productState",
  default: [
    {
      id: 1,
      name: "커피",
      price: 100,
    },
    {
      id: 2,
      name: "딸기",
      price: 50,
    },
    {
      id: 3,
      name: "참외",
      price: 200,
    },
  ],
});
```

### Selectors

- `/src/selecors/cartSelectors.js`

```js
import { selector } from "recoil";
import { cartAtom } from "../atoms/cartAtoms";
import { productAtom } from "../atoms/productAtoms";

// 장바구니에 담긴 제품 총액
export const cartTotalSelector = selector({
  key: "cartTotal",
  get: ({ get }) => {
    // 장바구니
    const cart = get(cartAtom);
    // 제품 목록
    const productList = get(productAtom);
    // acc = accumulator 누적값
    // cur = currentValue 현재값
    // qty = quantity 수량
    return cart.reduce((acc, cur) => {
      const product = productList.find((item) => cur.id === item.id);
      // 전체 합산금액 계산
      // return 현재 금액 + (제품가격 * 장바구니에 담긴 갯수)
      return acc + product.price * cur.qty;
    }, 0);
  },
});

// 장바구니에 담긴 제품 수
export const cartItemCounterSelector = selector({
  key: "cartItemCount",
  get: ({ get }) => {
    const cart = get(cartAtom);
    return cart.reduce((acc, cur) => acc + cur.qty, 0);
  },
});
```

- `/src/components/product` 활용하기

  - ProductList.jsx

  ```jsx
  import { useRecoilValue } from "recoil";
  import { productAtom } from "../../atoms/productAtoms";
  import ProductItem from "./ProductItem";

  function ProductList() {
    const products = useRecoilValue(productAtom);

    return (
      <div>
        <h1>제품 목록</h1>
        <div>
          {products.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      </div>
    );
  }

  export default ProductList;
  ```

  - ProductItem.jsx

  ```jsx
  import { useRecoilState } from "recoil";
  import { cartAtom } from "../../atoms/cartAtoms";

  function ProductItem({ product }) {
    const [cart, setCart] = useRecoilState(cartAtom);

    // 장바구니 담기
    const addCart = (id) => {
      // id 를 전달받으면 cart 에 제품 id 와 qty(수량) 업데이트
      setCart((currentCart) => {
        // 현재 카드에 이미 동일한 제품 id 가 있는지 검사
        const existID = currentCart.find((item) => item.id === id);
        // 만약 카트에 이미 제품이 있다면 수량만 증가
        if (existID) {
          //수량 증가
          return currentCart.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item,
          );
        }
        // 새로운 제품 id 추가 및 수량은 1로 최초등록
        return [...currentCart, { id: id, aty: 1 }];
      });
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          border: "1px solid black",
          width: "230px",
          padding: "5px 15px",
        }}
      >
        <h3>{product.name}</h3>
        <span>{product.price}원</span>
        <button onClick={() => addCart(product.id)}>장바구니 담기</button>
      </div>
    );
  }

  export default ProductItem;
  ```

- `/src/components/cart` 활용하기

  - CartList.jsx

  ```jsx
  import { useRecoilValue } from "recoil";
  import { cartAtom } from "../../atoms/cartAtoms";
  import CartItem from "./CartItem";

  function CartList() {
    const cart = useRecoilValue(cartAtom);

    return (
      <div>
        <h1> 내 장바구니</h1>
        <div>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }

  export default CartList;
  ```

  - CartItem.jsx

  ```jsx
  import { useRecoilState, useRecoilValue } from "recoil";
  import { productAtom } from "../../atoms/productAtoms";
  import { cartAtom } from "../../atoms/cartAtoms";

  function CartItem({ item }) {
    const [cartItem, setCartItem] = useRecoilState(cartAtom);
    const products = useRecoilValue(productAtom);
    const product = products.find((prd) => prd.id === item.id);

    const removeCart = (id) => {
      setCartItem((cur) => cur.filter((prd) => prd.id !== id));
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "5px 15px",
        }}
      >
        <h3>제품이름 : {product.name}</h3>
        <p>수량 : {item.qty}</p>
        <p>가격 : {product.price * item.qty}원</p>
        <button onClick={() => removeCart(item.id)}>삭제</button>
      </div>
    );
  }

  export default CartItem;
  ```

  - `/src/components/cart/CartSummary.jsx`

  ```jsx
  import { useRecoilValue } from "recoil";
  import {
    cartItemCounterSelector,
    cartTotalSelector,
  } from "../../selectors/cartSelectors";

  function CartSummary() {
    const totalPrice = useRecoilValue(cartTotalSelector);
    const totalCount = useRecoilValue(cartItemCounterSelector);

    return (
      <div>
        <p>총 상품 수 : {totalCount}</p>
        <p>총 금액 : {totalPrice}원</p>
      </div>
    );
  }

  export default CartSummary;
  ```
