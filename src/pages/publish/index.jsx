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
import {
  fetchSubmitArticle,
  fetchArticleInfo,
  fetchEditArticle,
} from "@/api/article";
import { useChannel, useQuery } from "@/hooks";

const Publish = () => {
  const [form] = Form.useForm();
  const { channels } = useChannel();
  const query = useQuery();

  const [articleId, setArticleId] = useState(""); // 文章id
  useEffect(() => {
    const id = query.get("id");
    if (id) {
      setArticleId(id);
      //获取详情
      handleGetInfo(id);
    }
  }, []);
  const handleEditorChange = (htmlStr) => {
    form.setFieldsValue({ content: htmlStr });
  };

  const handleFinish = (formValue) => {
    console.log(formValue);
    const { channel_id, content, title, type, image } = formValue;
    // 校验图片数量和选择的类型是否一致
    const imageList = image ? image : [];
    if (imageList.length !== coverType)
      return message.warning("图片类型和数量不一致");
    const data = {
      channel_id,
      content,
      title,
      cover: {
        type,
        images: imageList.map((item) => item.url),
      },
    };
    // 判断是不是编辑
    if (articleId) {
      handleEdit({ ...data, pub_date, id: articleId });
    } else {
      handleSubmit(data);
    }
  };

  // 发布文章
  const handleSubmit = async (data) => {
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

  // 编辑文章
  const handleEdit = async (data) => {
    try {
      const res = await fetchEditArticle(data);
      if (res.message === "OK") {
        message.success("编辑文章成功");
      } else {
        message.error(`${res.message}`);
      }
    } catch (error) {
      message.error("编辑文章失败");
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

  const [editFileList, setEditFileList] = useState([]);
  const [editContent, setEditContent] = useState("");
  const [pub_date, setPub_date] = useState("");
  // 获取详情
  const handleGetInfo = async (id) => {
    try {
      const res = await fetchArticleInfo(id);
      if (res.message === "OK") {
        const { channel_id, content, cover, title, pub_date } = res.data;
        const imageList = cover.images.map((item) => ({ url: item }));
        setPub_date(pub_date);
        setEditContent(content);
        setEditFileList(imageList);
        setCoverType(cover.type);
        form.setFieldsValue({
          channel_id,
          content,
          title,
          type: cover.type,
          image: imageList,
        });
      }
    } catch (error) {
      message.error("获取文章详情失败");
    }
  };

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
              options={channels}
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
              <Form.Item name="image">
                <Uploader
                  fileChange={fileChange}
                  coverType={coverType}
                  editFileList={editFileList}
                />
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <Editor getHtml={handleEditorChange} editContent={editContent} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? "更新文章" : "发布文章"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
