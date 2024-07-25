import { useState, useEffect } from "react";
import { fetchGetChannels } from "@/api/article";
import { message } from "antd";

const useChannel = () => {
  const [channels, setChannels] = useState([]);
  const handleGetChannels = async () => {
    try {
      const res = await fetchGetChannels();
      setChannels(res.data.channels);
    } catch (error) {
      message.error("获取频道列表失败");
    }
  };
  useEffect(() => {
    handleGetChannels();
  }, []);
  return { channels };
};

export default useChannel;
