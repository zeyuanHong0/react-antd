import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/images/logo.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "@/store/modules/user";

//phone:13800000002  code:246810

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (formValue) => {
    try {
      await dispatch(fetchLogin(formValue));
      message.success("登录成功");
      navigate("/index");
    } catch (error) {
      message.error("登录失败，请重试");
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form validateTrigger={["onBlur"]} onFinish={onFinish}>
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码格式不对",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
