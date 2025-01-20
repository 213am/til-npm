import { atom } from "recoil";

export const userInfo = atom({
  Key: "userinfo",
  default: {
    name: "",
    phone: "",
    birth: "",
    nickName: "",
  },
});
