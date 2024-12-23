import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
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
    .test("required", "첨부 파일을 업로드 해주세요", (value) => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
  profileImg: yup
    .mixed()
    .test("required", "프로필 이미지를 업로드 해주세요", (value) => {
      return value && value.length > 0;
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
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
          return file.size <= 2 * 1024 * 1024;
        })
      );
    })
    .test("fileCount", "최대 3개의 파일만 업로드 가능합니다", (value) => {
      return value && value.length <= 3;
    }),
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

function App() {
  // 이미지 미리보기 state
  const [preview, setPreview] = useState("");
  const [previewList, setPreviewList] = useState([]);

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

  // 이미지 한장 미리보기
  const changePreviewHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // 이미지 여러장 미리보기
  const changePreviewListHandler = (e) => {
    const files = Array.from(e.target.files);

    const list = files.map((item) => {
      return URL.createObjectURL(item);
    });
    setPreviewList([...list]);
  };

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
        {/* 여러 파일 첨부하기 */}
        <label>여러개의 파일 첨부하기</label>
        <input type="file" multiple {...register("ufiles")} />
        {/* 오류 메세지 */}
        <p style={{ color: "red" }}>{errors.ufiles?.message}</p>
        <br />
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
        <br />
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
        <br />
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
        <br />
        <button type="submit">로그인하기</button>
      </form>
    </>
  );
}
export default App;
