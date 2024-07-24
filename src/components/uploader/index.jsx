import "./index.scss";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchUploadImg } from "@/api/article";
import { useState } from "react";

const Uploader = () => {
  const [fileList, setFileList] = useState([]);

  const beforeUpload = ({ type, size }) => {
    const isJpgOrPng =
      type === "image/jpeg" || type === "image/png" || type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("你只能上传 JPG/PNG/JEPG 文件!");
    }
    const isLt2M = size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("图片必须小于 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUpload = async ({ file }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetchUploadImg(formData);
      if (res.message === "OK") {
        setFileList([...fileList, { url: res.data.url }]);
      } else {
        message.error(`${res.message}`);
      }
    } catch (error) {
      message.error("上传图片失败");
    }
  };
  return (
    <Upload
      accept="image/*"
      listType="picture-card"
      showUploadList
      customRequest={handleUpload}
      fileList={fileList}
      beforeUpload={beforeUpload}
    >
      <div>
        <PlusOutlined />
      </div>
    </Upload>
  );
};

export default Uploader;