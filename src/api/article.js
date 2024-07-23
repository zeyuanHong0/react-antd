import { http } from "@/utils";

// 获取频道列表
export const fetchGetChannels = () => {
  return http.get("/channels");
};
