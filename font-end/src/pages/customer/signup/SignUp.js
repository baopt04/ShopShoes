import React, { useState } from "react";
import "./Style-sign-up.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../component/customer/footer/Footer";
import { Form, Input } from "antd";
import { LoginApi } from "../../../api/employee/login/Login.api";
import { toast } from "react-toastify";
function SignUp() {
  const nav = useNavigate();
  const [formSignUp, setFormSignUp] = useState({
    roles: "ROLE_USER",
  });
  const [formErrors, setFormErrors] = useState({});
  const changeFormSignUp = (name, value) => {
    setFormSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors({});
  };
  const handleSignUp = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passPattern = /^(?=.*[0-9])(.{8,})$/;
    const phoneNumberPattern = /^0\d{9}$/;
    const isFormValid =
      formSignUp.email && formSignUp.password && formSignUp.phoneNumber;

    if (!isFormValid) {
      const errors = {
        email: !formSignUp.email ? "Vui lòng nhập email" : "",
        phoneNumber: !formSignUp.phoneNumber
          ? "Vui lòng nhập số điện thoại"
          : "",
        password: !formSignUp.password ? "Vui lòng nhập mật khẩu" : "",
      };
      setFormErrors(errors);
      return;
    } else if (isFormValid) {
      const errors = {
        email: !emailPattern.test(formSignUp.email)
          ? "Vui lòng nhập đúng định dạng email"
          : "",
        phoneNumber: !phoneNumberPattern.test(formSignUp.phoneNumber)
          ? "Vui lòng nhập đúng định dạng số điện thoại"
          : "",
        password: !passPattern.test(formSignUp.password)
          ? "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất 1 số"
          : "",
      };
      if (
        !errors.password === "" &&
        !errors.email === "" &&
        !errors.phoneNumber === ""
      ) {
        setFormErrors(errors);
        return;
      }
    }
    console.log(formSignUp);
    LoginApi.authenticationUp(formSignUp).then(
      (res) => {
        toast.success("Đăng ký thành công");
        nav("/login");
      },
      (err) => {
        if (err.response.data.message === "Email người dùng đã tồn tại") {
          setFormErrors((prev) => ({
            ...prev,
            email: err.response.data.message,
          }));
        } else if (
          err.response.data.message === "Số điện thoại đã được sử dụng."
        ) {
          setFormErrors((prev) => ({
            ...prev,
            phoneNumber: err.response.data.data,
          }));
        } else if (err.response.data.data !== "") {
          setFormErrors((prev) => ({
            ...prev,
            password: err.response.data.data,
          }));
        }
      }
    );
  };
  return (
    <React.Fragment>
      <div className="sign-up">
        <div className="box-sign-up">
          <div className="box-form-sign-up">
            <div className="title-signup ">Đăng ký</div>
            <div className="form-signup">
              <Form>
                <label htmlFor="" className="title-email">
                  Email:
                </label>
                <Form.Item
                  validateStatus={formErrors["email"] ? "error" : ""}
                  help={formErrors["email"] || ""}
                >
                  <Input
                    className="input-form-signup"
                    placeholder="Email"
                    onChange={(e) => changeFormSignUp("email", e.target.value)}
                  />
                </Form.Item>
                <label htmlFor="" className="title-number">
                  Số điện thoại:
                </label>
                <Form.Item
                  validateStatus={formErrors["phoneNumber"] ? "error" : ""}
                  help={formErrors["phoneNumber"] || ""}
                >
                  <Input
                    className="input-form-signup"
                    placeholder="Số điện thoại"
                    onChange={(e) =>
                      changeFormSignUp("phoneNumber", e.target.value)
                    }
                  />
                </Form.Item>
                <label htmlFor="" className="title-password">
                  Mật khẩu:
                </label>
                <Form.Item
                  validateStatus={formErrors["password"] ? "error" : ""}
                  help={formErrors["password"] || ""}
                >
                  <Input.Password
                    type="password"
                    className="input-form-signup"
                    placeholder="Mật khẩu"
                    onChange={(e) =>
                      changeFormSignUp("password", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <div className="button-signup" onClick={handleSignUp}>
                    Đăng ký
                  </div>
                </Form.Item>
                <Form.Item>
                  <div>
                    Bạn đã có tài khoản?{" "}
                    <Link style={{ color: "#e7511a" }} to={"/login"}>
                      Đăng nhập
                    </Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignUp;
