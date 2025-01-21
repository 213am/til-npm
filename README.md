# Ant Design

[site](https://ant.design/components/overview/)

장점

: UI 코딩 및 css 작업 시간 단축 및 통일성 있는 UI 구성 가능

단점
: UI CSS 수정이 어렵다
: 각 컴포넌트 사용법 학습에 시간이 오래 걸린다

<br/>

## 설치

`npm install antd --save`

<br/>

## 실습

- `/src/components/JoinForm.jsx` 파일 생성

```jsx
import { Button, Form, Input } from "antd";

const JoinForm = () => {
  // 1. 기본값 넣기(default)
  const initialValues = {
    userid: "hong",
    userpass: "hello",
    nickname: "길동",
    email: "a@bc.com",
  };

  // 2. 라벨 붙이기 => label="아이디"

  // 3. placeholder 넣기 => placeholder="아이디를 입력하세요"

  // 4. 필수값 표현하기 => required={true}

  // 5. 안내 메세지 표시하기
  //   rules={[
  //     { required: true, message: "아이디는 필수입력 항목입니다" },
  //     { min: 4, message: "아이디는 4자 이상입니다" },
  //     { max: 8, message: "아이디는 8자 이하입니다" },
  //   ]}

  // 6. 각 필드의 입력 중인 값 알아내기
  const onChangeField = (_field) => {
    console.log(_field[0].value);
  };

  // 7. 확인 버튼 시 최종 입력값
  const onFinished = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValues}
        onFieldsChange={(field, allFields) => onChangeField(field)}
        onFinish={(values) => onFinished(values)}
      >
        <Form.Item
          name={"userid"}
          label="아이디"
          required={true}
          rules={[
            { required: true, message: "아이디는 필수입력 항목입니다" },
            { min: 4, message: "아이디는 4자 이상입니다" },
            { max: 8, message: "아이디는 8자 이하입니다" },
          ]}
        >
          <Input placeholder="아이디를 입력하세요" />
        </Form.Item>
        <Form.Item
          name={"userpass"}
          label="비밀번호"
          required={true}
          rules={[
            { required: true, message: "비밀번호는 필수입력 항목입니다" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>
        <Form.Item name={"nickname"} label="닉네임">
          <Input placeholder="닉네임을 입력하세요" />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="이메일"
          required={true}
          rules={[
            { required: true, message: "비밀번호는 필수입력 항목입니다" },
            { type: "email", message: "이메일 형식에 맞지 않습니다" },
          ]}
        >
          <Input placeholder="이메일을 입력하세요" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JoinForm;
```

## 실습 예제 2

- 비밀번호 확인 입력창 추가

- `/src/components/PwForm.jsx` 파일 생성
