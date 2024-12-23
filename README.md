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
    .test("required", "첨부 파일을 업로드 해주세요", (value) => {
      return value && value.length > 0;
    })
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
    .test("required", "프로필 이미지를 업로드 해주세요", (value) => {
      return value && value.length > 0;
    })
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

### 4.3. 여러 파일 첨부하기

```jsx
  {/* 여러 파일 첨부하기 */}
<label>여러개의 파일 첨부하기</label>
<input type="file" multiple {...register("ufiles")} />
{/* 오류 메세지 */}
<p style={{ color: "red" }}>{errors.ufiles?.message}</p>
```

```jsx
const loginSchema = yup.object({
  ufiles: yup
    .mixed()
    .test("required", "1개 이상의 파일을 업로드 해주세요", (value) => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return (
        // 파일들이 있다면 && 모든 파일들을 배열로 변환해 조건이 맞는지 반복해서 비교한다.
        // every 는 모두 true 인 경우만 true 를 return 한다
        // 하나라도 false 가 나오면 false 를 return 한다
        value &&
        Array.from(value).every((file) => {
          file.size <= 2 * 1024 * 1024;
        })
      );
    })
    .test("fileCount", "최대 3개의 파일만 업로드 가능합니다", (value) => {
      return value && value.length <= 3;
    }),
});
```

### 4.4. 여러 이미지 파일 첨부하기

```jsx
 {/* 여러 이미지 첨부하기 */}
<label>여러개의 이미지 첨부하기</label>
<input
  type="file"
  accept="image/png, image/jpeg"
  multiple
  {...register("uimgfiles")}
/>
{/* 오류 메세지 */}
<p style={{ color: "red" }}>{errors.uimgfiles?.message}</p>
```

```jsx
const loginSchema = yup.object({
  uimgfiles: yup
    .mixed()
    .test("required", "1개 이상의 이미지를 업로드 해주세요", (value) => {
      return value && value.length > 0;
    })
    .test("fileCount", "최대 3개의 이미지만 업로드 가능합니다", (value) => {
      return value && value.length <= 3;
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      // 파일이 1개가 아니고 여러개이므로 반복문으로 type 비교를 해야 함.
      return (
        value &&
        Array.from(value).every((file) =>
          ["image/jpeg", "image/png"].includes(file.type),
        )
      );
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      // 파일이 1개가 아니고 여러개 이므로 반복문으로 각각의 파일의 크기를 알아내야한다
      return (
        value &&
        Array.from(value).every((file) => {
          file.size <= 2 * 1024 * 1024;
        })
      );
    }),
});
```

## 5. 파일 미리보기

### 5.1. 1개의 이미지 미리보기

```jsx
{/* 1개 이미지 미리보기 */}
<label>이미지 1개 미리보기</label>
<input
  type="file"
  accept="image/png, image/jpeg"
  {...register("previewfile")}
  onChange={changePreviewHandler}
/>
{/* 오류 메세지 */}
<p style={{ color: "red" }}>{errors.previewfile?.message}</p>
{preview && (
<div>
  <h3>이미지 미리보기</h3>
  <img
    src={preview}
    alt="첨부파일 미리보기"
    style={{ width: 200, height: 200 }}
  />
</div>
)}
```

```jsx
const loginSchema = yup.object({
  previewfile: yup
    .mixed()
    .test("required", "미리보기 할 이미지를 업로드 해주세요", (value) => {
      return value && value.length > 0;
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
});

// 이미지 미리보기 state
const [preview, setPreview] = useState("");

// 이미지 한장 미리보기
const changePreviewHandler = (e) => {
  const file = e.target.files[0];
  if (file) {
    // 웹브라우저에 임시 이미지 URL 을 생성해야 함
    // 선택된 파일을 웹브라우저 cache 에 저장되어있음
    // 이를 이용해 임시 url 을 생성함
    // blob 을 생생해줌
    // Blob(Binary Large Object) - 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용
    setPreview(URL.createObjectURL(file));
  } else {
    setPreview(null);
  }
};
```

### 5.2. 여러개의 이미지 미리보기

```jsx
{/* 여러개 이미지 미리보기 */}
<label>이미지 여러장 미리보기</label>
<input
  type="file"
  multiple
  accept="image/png, image/jpeg"
  {...register("previewlist")}
  onChange={(e) => changePreviewListHandler(e)}
/>
{/* 오류 메세지 */}
<p style={{ color: "red" }}>{errors.previewlist?.message}</p>
<div>
  <h3>여러개의 이미지 미리보기</h3>
  {previewList.map((item, index) => {
    return (
      <img
        key={index}
        src={item}
        alt="여러개의 첨부파일 미리보기"
        style={{ width: 200, height: 200 }}
      />
    );
  })}
</div>
```

```jsx
const [previewList, setPreviewList] = useState([]);

// 이미지 여러장 미리보기
const changePreviewListHandler = (e) => {
  const files = Array.from(e.target.files);

  const list = files.map((item) => {
    URL.createObjectURL(item);
  });
  setPreviewList([...list]);
};

const loginSchema = yup.object({
  previewlist: yup
    .mixed()
    .test("required", "미리보기 할 이미지를 업로드 해주세요", (value) => {
      return value && value.length > 0;
    })
    .test("fileCount", "최대 3개의 이미지만 업로드 가능합니다", (value) => {
      return value && value.length <= 3;
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      // 파일이 1개가 아니고 여러개이므로 반복문으로 type 비교를 해야 함.
      return (
        value &&
        Array.from(value).every((file) => {
          return ["image/jpeg", "image/png"].includes(file.type);
        })
      );
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      // 파일이 1개가 아니고 여러개 이므로 반복문으로 각각의 파일의 크기를 알아내야한다
      return (
        value &&
        Array.from(value).every((file) => {
          return file.size <= 2 * 1024 * 1024;
        })
      );
    }),
});
```

## 6. axios 로 파일 전송하기 주의사항

### 6.1. axios 로 파일을 전송할 때 아래 구문을 준수

```jsx
const formSubmitHandler = async (data) => {
  console.log(data);

  try {
    // string 이었다면 아래로 가능
    // const res = await axios.post("주소", data);

    // file 을 전송하려면 option 이 추가되어야 함
    // DB 연동을 위해서는 객체 형식으로 변환이 필요
    const sendData = new FormData();
    sendData.append("uid", data.name);
    sendData.append("umail", data.email);
    sendData.append("upw", data.password);
    sendData.append("upwconfirm", data.passwordConfirm);
    sendData.append("ufile", data.file);
    sendData.append("userimg", data.profileImg);
    sendData.append("ufiles", data.ufiles);
    sendData.append("uimgfiles", data.uimgfiles);
    sendData.append("previewfile", data.previewfile);
    sendData.append("previewlist", data.previewList);

    const res = await axios.post("주소", data, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 전송 형식
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
```
