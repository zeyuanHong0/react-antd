import { http } from "@/utils";

// 获取频道列表
export const fetchGetChannels = () => {
  return http.get("/channels");
};

// 提交文章
export const fetchSubmitArticle = (data) => {
  return http.post("/mp/articles?draft=false", data);
};
