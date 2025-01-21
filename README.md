# React Router Dom 2

`npm i react-router-dom`

- site map 부터 구성
- BrowserRouter > Routes > Route 구조
- 기존 구성 방식도 많은 서비스에서 사용합니다

- `그 방식에서 조금 더 업데이트 한다면?`

<br/>

## Router 를 파일로 관리하자

### 1. 폴더 구조

- `/src/router` 폴더 생성
- `/src/router/root.js` 파일 생성
- root.js 의 용도
  : 기본 라우터 경로 작성
  : 서브 라우터들은 별도의 파일로 관리

```jsx
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>홈</h1>,
  },
  {
    path: "/company",
    element: <h1>회사</h1>,
  },
  {
    path: "/good",
    element: <h1>제품</h1>,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;
```

### 2. Router 사용하기

```jsx
import { RouterProvider } from "react-router-dom";
import router from "./router/root";

function App() {
  return (
    <div>
      <h1>App</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
```

## 응용예제

### 1. 로딩창 만들기

- `npm i react-spinners`
- [site](https://www.davidhu.io/react-spinners/)

- `/src/components/loading` 폴더 생성
- `/src/components/loading/Loading.jsx` 파일 생성

```jsx
import { ClipLoader } from "react-spinners";

const Loading = () => {
  const LoadingCss = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };
  return (
    <div style={LoadingCss}>
      <ClipLoader color="#a518c9" loading size={200} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
```

### 2. Suspense 와 lazy 를 사용한 동적 로딩

- `/src/pages` 폴더 생성
- `/src/pages/index.jsx` 파일 생성

```jsx
const Index = () => {
  return <h1>홈</h1>;
};

export default Index;
```

- `/src/pages/Company.jsx` 파일 생성

```jsx
const Company = () => {
  return <h1>회사</h1>;
};

export default Company;
```

- `/src/pages/Good.jsx` 파일 생성

```jsx
function Good() {
  return <div>제품</div>;
}

export default Good;
```

### 3. Router 적용

```jsx
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const LazyHome = lazy(() => import("../pages/index"));
const LazyCompany = lazy(() => import("../pages/Company"));
const LazyGood = lazy(() => import("../pages/Good"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyHome />
      </Suspense>
    ),
  },
  {
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCompany />
      </Suspense>
    ),
  },
  {
    path: "/good",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyGood />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;
```

### 4. children 속성 사용

```jsx
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const LazyHome = lazy(() => import("../pages/index"));
const LazyCompany = lazy(() => import("../pages/Company"));
const LazyGood = lazy(() => import("../pages/Good"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyHome />
      </Suspense>
    ),
  },
  {
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCompany />
      </Suspense>
    ),
    children: [
      { path: "ceo", element: <h1>회장님인사말</h1> },
      { path: "location", element: <h1>회사위치</h1> },
    ],
  },
  {
    path: "/good",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyGood />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;
```

```jsx
import { Outlet } from "react-router-dom";

const Company = () => {
  return (
    <>
      <h1>회사</h1>
      <Outlet />
    </>
  );
};

export default Company;
```

#### 4.1. children 들을 회부 파일로 빼자

- companyRouter.jsx

```jsx
const companyRouter = () => {
  return [
    { path: "ceo", element: <h1>회장님인사말</h1> },
    { path: "location", element: <h1>회사위치</h1> },
  ];
};

export default companyRouter;
```

- root.jsx
  : `children 변경`

```jsx
{
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCompany />
      </Suspense>
    ),
    children: companyRouter(),
  },
```

## 정리

- 조건은 React Router Dom 버전 6 이상의 최신 버전에서만 사용가능
- 기존 소스들은 아마도 거의 옛날 버전으로 되어있을 것입니다.
