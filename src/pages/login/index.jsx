import "./index.scss";
import { Card, Form, Input, Button } from "antd";
import logo from "@/assets/images/logo.png";
import { useState } from "react";

const Login = () => {
  const validatePhoneNumber = (value) => {
    if (!value) {
      return {
        validateStatus: "error",
        help: "手机号不能为空",
      };
    }
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
      return {
        validateStatus: "error",
        help: "请输入有效的手机号",
      };
    }
    return {
      validateStatus: "success",
      help: null,
    };
  };

  const validateCode = (value) => {
    if (!value) {
      return {
        validateStatus: "error",
        help: "验证码不能为空",
      };
    }
    return {
      validateStatus: "success",
      help: null,
    };
  };

  // 手机号
  const [phoneNumber, setPhoneNumber] = useState({
    value: "",
  });
  // 验证码
  const [code, setCode] = useState({
    value: "",
  });

  const handleBlur = (field, validator, setter) => {
    setter((prevState) => ({
      ...prevState,
      ...validator(field.value),
    }));
  };

  const handleSubmit = () => {
    // 校验
    setPhoneNumber((preState) => ({
      ...preState,
      ...validatePhoneNumber(phoneNumber.value),
    }));
    setCode((preState) => ({
      ...preState,
      ...validateCode(code.value),
    }));
    if (
      phoneNumber.validateStatus !== "success" ||
      code.validateStatus !== "success"
    ) {
      return;
    } else {
      console.log("登录成功");
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form>
          <Form.Item
            validateStatus={phoneNumber.validateStatus}
            help={phoneNumber.help}
          >
            <Input
              size="large"
              placeholder="请输入手机号"
              value={phoneNumber.value}
              onChange={(e) =>
                setPhoneNumber({ ...phoneNumber, value: e.target.value })
              }
              onBlur={() =>
                handleBlur(phoneNumber, validatePhoneNumber, setPhoneNumber)
              }
            />
          </Form.Item>
          <Form.Item validateStatus={code.validateStatus} help={code.help}>
            <Input
              size="large"
              placeholder="请输入验证码"
              onChange={(e) => setCode({ ...code, value: e.target.value })}
              onBlur={() => handleBlur(code, validateCode, setCode)}
              maxLength={6}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              onClick={handleSubmit}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
