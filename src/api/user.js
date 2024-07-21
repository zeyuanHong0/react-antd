import { http } from "@/utils";

// 用户登录
export const fetchUserLogin = (data) => {
  return http.post("/authorizations", data);
};

// 获取用户信息
export const fetchGetUserInfo = () => {
  return http.get("/user/profile");
}