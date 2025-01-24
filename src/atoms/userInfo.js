import { atom } from "recoil";

export const loginInfoState = atom({
  key: "loginInfoState",
  default: {
    userId: 0,
    roleId: 0,
    name: "",
    accessToken: "",
  },
});
