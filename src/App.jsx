import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
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
  file: yup
    .mixed()
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    })
    .required("첨부 파일을 넣어주세요"),
  profileImg: yup
    .mixed()
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    })
    .required("프로필 이미지를 추가해주세요"),
});

function App() {
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
    // setValue("email", "abcd@def.net");
  }, []);

  useEffect(() => {
    // trigger();
  }, [trigger]);

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
        <label>첨부 파일</label>
        <input type="file" {...register("file")} />
        {/* 오류 메세지 */}
        <p style={{ color: "red" }}>{errors.file?.message}</p>
        <br />
        <label>프로필 이미지</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          {...register("profileImg")}
        />
        {/* 오류 메세지 */}
        <p style={{ color: "red" }}>{errors.profileImg?.message}</p>
        <br />
        <button type="submit">로그인하기</button>
      </form>
    </>
  );
}
export default App;
