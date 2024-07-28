import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  message,
  Popconfirm,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Pagination from "@/components/pagination";
import { fetchGetArticles, fetchDeleteArticle } from "@/api/article";
import img404 from "@/assets/images/error.png";
import useChannel from "@/hooks/useChannel";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

const statusMap = {
  0: <Tag color="default">草稿</Tag>, //草稿
  1: <Tag color="warning">待审核</Tag>, //待审核
  2: <Tag color="success">审核通过</Tag>, //审核通过
  3: <Tag color="error">审核失败</Tag>, //审核失败
};

const Article = () => {
  const { channels } = useChannel();
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => statusMap[data],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Popconfirm
              title="提示"
              description="确定删除该文章吗?"
              onConfirm={() => confirmDelete(data)}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const confirmDelete = ({ id }) => {
    try {
      const res = fetchDeleteArticle(id);
    } catch (error) {
      message.error("删除文章失败");
    }
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const onFinish = (formValue) => {
    console.log(formValue);
    const { status, channel_id, date } = formValue;
    setSearchValue({
      status,
      channel_id,
      begin_pubdate: date ? date[0].format("YYYY-MM-DD") : null,
      end_pubdate: date ? date[1].format("YYYY-MM-DD") : null,
    });
  };

  // 改变分页
  const changePage = (num, size) => {
    setPageNum(num);
    setPageSize(size);
  };

  // 获取列表
  const [isListLoading, setIsListLoading] = useState(false);
  const [searchValue, setSearchValue] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
  });
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const handleGetList = async (num, size) => {
    setIsListLoading(true);
    try {
      const data = {
        ...searchValue,
        page: num ? num : pageNum,
        per_page: size ? size : pageSize,
      };
      const res = await fetchGetArticles(data);
      if (res.message === "OK") {
        setList(res.data.results);
        setTotal(res.data.total_count);
      } else {
        message.error(`${res.message}`);
      }
    } catch (error) {
      message.error("获取文章列表失败");
    } finally {
      setIsListLoading(false);
    }
  };

  useEffect(() => {
    handleGetList();
  }, [searchValue, pageNum, pageSize]);
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
              options={channels}
              fieldNames={{ label: "name", value: "id" }}
            />
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/*    列表    */}
      <Card title={`根据筛选条件共查询到 ${total} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={false}
          loading={isListLoading}
        />
        <div style={{ marginTop: 20 }}>
          <Pagination pageNum={pageNum} total={total} changePage={changePage} />
        </div>
      </Card>
    </div>
  );
};

export default Article;
