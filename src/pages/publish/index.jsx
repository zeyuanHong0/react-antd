import "./index.scss";
import { useEffect, useState } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Space,
  Select,
  message,
} from "antd";
import { Link } from "react-router-dom";
import Editor from "@/components/editor";
import Uploader from "@/components/uploader";
import { fetchGetChannels, fetchSubmitArticle } from "@/api/article";

const Publish = () => {
  const [form] = Form.useForm();
  const [channelSelectList, setChannelSelectList] = useState([]);
  const handleEditorChange = (htmlStr) => {
    form.setFieldsValue({ content: htmlStr });
  };

  const handleFinish = async (formValue) => {
    console.log(formValue);
    const data = {
      ...formValue,
      cover: {
        type: 0,
        images: [],
      },
    };
    try {
      const res = await fetchSubmitArticle(data);
      if (res.message === "OK") {
        message.success("发布文章成功");
      } else {
        message.error(`${res.message}`);
      }
    } catch (error) {
      message.error("发布文章失败");
    }
  };

  const [coverType, setCoverType] = useState(1);
  const coverTypeChange = (e) => {
    const type = e.target.value;
    setCoverType(type);
  };

  const fileChange = (imageList) => {
    form.setFieldsValue({ image: imageList });
  };

  // 获取频道下拉列表
  const handleGetChannels = async () => {
    try {
      const res = await fetchGetChannels();
      setChannelSelectList(res.data.channels);
    } catch (error) {
      message.error("获取频道列表失败");
    }
  };

  useEffect(() => {
    handleGetChannels();
  }, []);
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select
              placeholder="请选择文章频道"
              style={{ width: 400 }}
              options={channelSelectList}
              fieldNames={{ label: "name", value: "id" }}
            />
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={coverTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {coverType > 0 && (
              <Uploader
                name="image"
                fileChange={fileChange}
                coverType={coverType}
              />
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <Editor getHtml={handleEditorChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
