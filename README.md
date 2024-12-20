# react hook form 과 yup

## 1. 설치

`npm i react-hook-form`
`npm i @hookform/resolvers`

- [hookform site](https://react-hook-form.com/)
- [hookform npm](https://www.npmjs.com/package/react-hook-form)

`npm i yup`

- [yup site](https://github.com/jquense/yup)
- [yup npm](https://www.npmjs.com/package/yup)

### 1.1. 한번에 설치

`npm i react-hook-form @hookform/resolvers yup`

## 2. 참조

- [react-hook-fomr 참조블로그](https://velog.io/@boyeon_jeong/React-Hook-Form)

- [yup 참조블로그](https://velog.io/@boyeon_jeong/Yup-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0)

## 3. 응용

### 3.1. 기본 hook-form 코드

```jsx
import { useForm } from "react-hook-form";

function App() {
  // register : form 요소를 관리
  // handleSubmit : form 데이터 전송시 처리
  const { register, handleSubmit } = useForm();

  // form 에 담겨진 데이터 전송 처리
  // e.preventDefault() 필요없음
  const formSubmitHandler = (data) => {
    // 모아서 전송할 데이터 ( axios post 전송 )
    console.log(data);
  };

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <label>이름</label>
        <input type="text" {...register("name")} />
        <button type="submit">로그인하기</button>
      </form>
    </>
  );
}
export default App;
```

### 3.2. 기본 yup 유효성 코드 추가

```jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// schema 를 먼저 생성
const loginSchema = yup.object({
  name: yup.string().required("이름은 필수입력 항목입니다"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const formSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <label>이름</label>
        <input type="text" {...register("name")} />
        <button type="submit">로그인하기</button>
        {/* 오류 메세지 */}
        <p style={{ color: "red" }}>{errors.name?.message}</p>
      </form>
    </>
  );
}
export default App;
```

### 3.3. 추가 필드, 추가 유효성 schema 작성

```jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// schema 를 먼저 생성
const loginSchema = yup.object({
  name: yup
    .string()
    .min(4, "최소 4자 이상 입력해주세요")
    .required("아이디는 필수입력 항목입니다"),
  email: yup
    .string()
    .email("이메일 주소를 확인해주세요")
    .required("이메일은 필수입력 항목입니다"),
  password: yup
    .string()
    .min(4, "최소 4자 이상 입력해주세요")
    .required("비밀번호는 필수입력 항목입니다"),
  passwordConfirm: yup
    .string()
    // regiter name "password" 의 값을 참조하겠다
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
    .required("비밀번호 확인이 필요합니다"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    // 기본값 지정
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const formSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <label>아이디</label>
        <input {...register("name")} />
        {/* 오류 메세지 */}
        <p style={{ color: "red" }}>{errors.name?.message}</p>
        <br />
        <label>이메일</label>
        <input {...register("email")} />
        {/* 오류 메세지 */}
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <br />
        <label>비밀번호</label>
        <input type="password" {...register("password")} />
        {/* 오류 메세지 */}
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <br />
        <label>비밀번호 확인</label>
        <input {...register("passwordConfirm")} />
        {/* 오류 메세지 */}
        <p style={{ color: "red" }}>{errors.passwordConfirm?.message}</p>
        <br />
        <button type="submit">로그인하기</button>
      </form>
    </>
  );
}
export default App;
```

### 3.4. form 의 name 에 `기본값 추가`

```jsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  // 기본값 지정
  defaultValues: {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  },
});
```

### 3.4. form 의 `초기에 유효성 검사 실행` 하기

```jsx
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(loginSchema),
    // 기본값 지정
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

    useEffect(() => {
    trigger();
  }, [trigger]);

```

### 3.6. `유효성 검사 출력 시점` 변경하기

```jsx
const {
  register,
  handleSubmit,
  trigger,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  // 기본값 지정
  defaultValues: {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  },
  // 유효성 검사 방식( submit 시에만 )
  // mode: "onSubmit",
  // 유효성 검사 방식( 입력 진행중에 )
  mode: "onChange",
});

const formSubmitHandler = (data) => {
  console.log(data);
};

useEffect(() => {
  // trigger();
}, [trigger]);
```

### 3.7. `원하는 form` 에 값을 강제로 넣기

```jsx
const {
  register,
  handleSubmit,
  trigger,
  setValue,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  // 기본값 지정
  defaultValues: {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  },
  // 유효성 검사 방식( submit 시에만 )
  // mode: "onSubmit",
  // 유효성 검사 방식( 입력 진행중에 )
  mode: "onChange",
});

const formSubmitHandler = (data) => {
  console.log(data);
};

// 원하는 시점에 특정 input 에만 지정된 값을 넣기
// 주소 입력시 ㅇㅇ시 를 선택하면 해당하는 구 의 목록이 나온다거나
// 전화번호 입력시 숫자만 입력하면 자동으로 - 를 추가한다거나 등등
useEffect(() => {
  setValue("email", "abcd@def.net");
}, []);
```

## 4. 파일 업로드 관련

### 4.1. 기본 파일 처리

```jsx
const loginSchema = yup.object({
  file: yup
    .mixed()
    .required("첨부 파일을 넣어주세요")
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
});
```

```jsx
<label>첨부 파일</label>
<input type="file" {...register("file")} />
{/* 오류 메세지 */}
<p style={{ color: "red" }}>{errors.file?.message}</p>
```

### 4.2. 이미지 파일 첨부

```jsx
const loginSchema = yup.object({
  profileImg: yup
    .mixed()
    .required("프로필 이미지를 추가해주세요")
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    }),
});
```

```jsx
<label>프로필 이미지</label>
<input
  type="file"
  accept="image/png, image/jpeg"
  {...register("profileImg")}
/>
{/* 오류 메세지 */}
<p style={{ color: "red" }}>{errors.profileImg?.message}</p>
```
