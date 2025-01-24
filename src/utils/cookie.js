import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = () => {
  return cookies.get("accessToken");
};

export const setCookie = (value, options) => {
  return cookies.set("accessToken", value, { ...options });
};

export const removeCookie = (options) => {
  return cookies.remove("accessToken", { ...options });
};
