import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import "./style-login-management.css";
import Logo from "../../../assets/images/login_new.png";
import Wallpaper from "../../../assets/images/wallpaper_login.PNG";
import { LoginApi } from "../../../api/employee/login/Login.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { setToken, setUserToken } from "../../../helper/useCookies";
import { jwtDecode } from "jwt-decode";
const LoginManagement = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);

  const showPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const handleForgotPasswordCancel = () => {
    setPasswordModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    LoginApi.authenticationIn(values)
      .then((res) => {
        setToken(res.data.token);
        setUserToken(res.data.token);
        const decodedToken = jwtDecode(res.data.token);
        if (decodedToken.role.includes("ROLE_ADMIN")) {
          nav("/dashboard");
        } else {
          nav("/sale-counter");
        }
        toast.success("Đăng nhập thành công");
      })
      .catch((error) => {});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handResetPassword = () => {
    form
      .validateFields()
      .then((values) => {
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có muốn tiếp tục không?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: () => resolve(values),
            onCancel: () => reject(),
          });
        });
      })
      .then((values) => {
        LoginApi.restPassword(values)
          .then((res) => {
            setPasswordModalVisible(false);
            toast.success("Đổi mật khẩu thành công");
            nav("/login-management");
          })
          .catch((err) => {
            console.log("Tài khoản hoặc mật khẩu không đúng");
          });
      })
      .catch(() => {});
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src={Wallpaper}
            alt="Login"
          />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <img src={Logo} className="logo-admin" alt="Logo" />
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ Email" },
              {
                type: "email",
                message: "Định dạng Email không hợp lệ",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email address"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
            <Button type="link" onClick={showPasswordModal}>
              Forgot Password ?
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title="Forgot Password"
        visible={isPasswordModalVisible}
        onCancel={handleForgotPasswordCancel}
        footer={null}
      >
        <Form form={form}>
          <Form.Item
            name="emailForgot"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ Email" },
              {
                type: "email",
                message: "Định dạng Email không hợp lệ",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email address"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              size="large"
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handResetPassword}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginManagement;
