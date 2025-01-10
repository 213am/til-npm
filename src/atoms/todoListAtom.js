import { atom } from "recoil";

export const todoListAtom = atom({
  key: "todoListAtom", // atom 구분하는 키
  default: [], // todoList 를 담을 기본 배열
});
