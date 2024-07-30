import "./index.scss";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchUploadImg } from "@/api/article";
import { useState, useRef, useEffect } from "react";

const Uploader = ({ coverType, fileChange, editFileList }) => {
  const [fileList, setFileList] = useState([]);
  const cacheImageList = useRef([]); // 缓存图片列表

  useEffect(() => {
    setFileList(editFileList);
    cacheImageList.current = editFileList;
  }, [editFileList]);

  useEffect(() => {
    if (coverType === 1) {
      const imgList = cacheImageList.current.slice(0, 1);
      setFileList(imgList);
    } else if (coverType === 3) {
      const imgList = cacheImageList.current.slice(0, 3);
      setFileList(imgList);
    }
  }, [coverType]);

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
        const list = [...fileList, { url: res.data.url }];
        setFileList(list);
        fileChange(list);
        cacheImageList.current = list;
      } else {
        message.error(`${res.message}`);
      }
    } catch (error) {
      message.error("上传图片失败");
    }
  };

  // 移除图片
  const handleRemove = (e) => {
    const newList = fileList.filter((item) => item.url !== e.url);
    setFileList(newList);
    fileChange(newList);
    cacheImageList.current = newList;
  };
  return (
    <Upload
      accept="image/*"
      listType="picture-card"
      showUploadList
      maxCount={coverType}
      customRequest={handleUpload}
      fileList={fileList}
      beforeUpload={beforeUpload}
      onRemove={handleRemove}
    >
      <div>
        <PlusOutlined />
      </div>
    </Upload>
  );
};

export default Uploader;
