import React, { useEffect, useRef, useState } from "react";
import "./style-profile.css";
import { Col, Form, Modal, Radio, Row, Tooltip } from "antd";

import { AccountClientApi } from "../../../../api/customer/account/accountClient.api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { dispatch } from "../../../../app/store";
import { SetUserClient } from "../../../../app/reducer/UserClient.reducer";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import {
  DeleteAddressAccountClient,
  GetAddressAccountClient,
  SetAddressAccountClient,
  UpdateAddressDefaultAccountClient,
} from "../../../../app/reducer/AddressAccountClient.reducer";
import { AddressClientApi } from "../../../../api/customer/address/addressClient.api";
import ModalCreateAddress from "../address/modal/ModalCreateAddress";
import ModalUpdateAddress from "../address/modal/ModalUpdateAddress";
function Profile() {
  const [formInfo, setFormInfo] = useState({});
  const [showImage, setShowImage] = useState("");
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [idAddress, setIdAddress] = useState("");
  const dispatch = useAppDispatch();
  const data = useAppSelector(GetAddressAccountClient);

  const fileInputRef = useRef(null);
  const id = sessionStorage.getItem("idAccount");
  useEffect(() => {
    AccountClientApi.getById(id).then((res) => {
      const data = res.data.data.user;
      dispatch(SetUserClient(data));
      setFormInfo({
        id: data.id,
        fullName: data.fullName,
        dateOfBirth: dayjs(data.dateOfBirth),
        phoneNumber: data.phoneNumber,
        email: data.email,
        gender: data.gender,
      });
      setShowImage(data.avata);
    });
  }, []);

  useEffect(() => {
    console.log(formInfo);
  }, [formInfo]);
  const handleFormInfo = (name, item) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: item,
    }));
  };
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Khi click vào phần tử tùy chỉnh, mở hộp thoại chọn tệp
  };

  const handleFileChange = (file) => {
    console.log(file);
    if (file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        toast.error("Bạn chỉ có thể tải lên tệp JPG/PNG!");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target.result;
        setShowImage(imageDataURL);
        handleFormInfo("avata", file);
      };

      reader.readAsDataURL(file);
    } else {
      handleFormInfo("avata", "");
    }
  };
  const convertToLong = () => {
    const convertedFormData = { ...formInfo };
    if (formInfo.dateOfBirth) {
      convertedFormData.dateOfBirth = dayjs(formInfo.dateOfBirth).unix() * 1000;
    }
    return convertedFormData;
  };
  const handleUpdateInfoUser = () => {
    AccountClientApi.updateInfoUser(convertToLong()).then((res) => {
      dispatch(SetUserClient(res.data.data));
      toast.success("Cập nhập thành công");
    });
  };

  useEffect(() => {
    if (data != null) {
      setList(data);
      console.log(data);
    }
  }, [data]);
  const [list, setList] = useState([]);
  useEffect(() => {
    AddressClientApi.getListByAccount(id).then((res) => {
      dispatch(SetAddressAccountClient(res.data.data));
      console.log(res.data.data);
    });
  }, []);
  const setDefault = (id, idAccount) => {
    Modal.confirm({
      title: "Xác nhận đặt mặc định",
      content: "Bạn có chắc chắn muốn đặt mặc định không?",
      okText: "Đặt",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        AddressClientApi.setDefault({
          idAddress: id,
          idAccount: idAccount,
        }).then((res) => {
          dispatch(UpdateAddressDefaultAccountClient(res.data.data));
        });
      },
    });
  };
  const deleteAddressClient = (id) => {
    AddressClientApi.deleteAddressClient(id).then((res) => {
      dispatch(DeleteAddressAccountClient(res.data.data));
    });
  };
  const openModalCreate = () => {
    setModalCreate(true);
  };
  const openModalUpdate = (id) => {
    setIdAddress(id);
    setModalUpdate(true);
  };

  return (
    <React.Fragment>
      <div className="profile-account">
        <div className="title-profile-account">
          <p className="title-profile">Hồ sơ của tôi</p>
          <p className="sub-title-profile">
            {" "}
            Quản lý thông tin để bảo mật tài khoản
          </p>
        </div>
        <div style={{ marginTop: "60px" }}>
          <Row justify={"center"}>
            <Col span={15} className="left-profile" style={{marginBottom: "10px"}}>
              <Form
                labelCol={{
                  span: 5,
                }}
              >
                <Form.Item label="Họ và tên">
                  <input
                    value={formInfo["fullName"]}
                    className="input-info-profile"
                    placeholder="Điền họ và tên"
                    onChange={(e) => handleFormInfo("fullName", e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <input
                    value={formInfo["email"]}
                    className="input-info-profile"
                    placeholder="Điền email"
                    onChange={(e) => handleFormInfo("email", e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  <input
                    value={formInfo["phoneNumber"]}
                    className="input-info-profile"
                    placeholder="Điền số điện thoại"
                    onChange={(e) =>
                      handleFormInfo("phoneNumber", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="Giới tính">
                  <Radio.Group
                    style={{ display: "flex" }}
                    className="box-input-info-profile"
                    value={formInfo["gender"]}
                    name="gender"
                    onChange={(e) => handleFormInfo("gender", e.target.value)}
                  >
                    <Radio checked={formInfo["gender"] === true} value={true}>
                      Nam
                    </Radio>
                    <Radio checked={formInfo["gender"] === false} value={false}>
                      Nữ
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Ngày sinh">
                  <input
                    value={dayjs(formInfo["dateOfBirth"]).format("YYYY-MM-DD")}
                    className="input-date-of-birth-profile"
                    type="date"
                    onChange={(e) =>
                      handleFormInfo("dateOfBirth", e.target.value)
                    }
                  />
                </Form.Item>
              </Form>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  className="button-update-profile"
                  onClick={handleUpdateInfoUser}
                >
                  Cập nhập
                </div>
              </div>
            </Col>
            <Col span={9} align="middle" justify="center">
              <div style={{ textAlign: "center" }}>
                <img
                  src={showImage}
                  alt="..."
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <p
                  className="button-upload-image-profile"
                  onClick={handleButtonClick}
                >
                  Chọn ảnh
                </p>
              </div>

              <p style={{ marginTop: "10px" }}>
                Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
              </p>
            </Col>
          </Row>
          <div>
            <div className="header-new-add" style={{ marginTop: "10px" }}>
              <p className="title-profile">Danh sách địa chỉ</p>
              <div
                className="button-add-address-account"
                onClick={() => openModalCreate()}
              >
                Thêm mới
              </div>
            </div>
            <div className="list-address-account">
              {list.map((item, index) => (
                <div
                  key={index}
                  className={
                    index < list.length - 1
                      ? "item-address-account"
                      : "item-address-account-last"
                  }
                >
                  <div>
                    <div>
                      <span>{item.fullName}</span>
                      {" | "}
                      <span style={{ color: "gray", fontSize: 15 }}>
                        {" "}
                        {item.phoneNumber}
                      </span>
                    </div>
                    <div style={{ color: "gray", fontSize: 14, marginTop: 5 }}>
                      <p>{item.line}</p>
                      <p>
                        {item.ward}, {item.district}, {item.province}
                      </p>
                    </div>

                    {item.status === "DANG_SU_DUNG" ? (
                      <div className="status-default-address-account">
                        Mặc định
                      </div>
                    ) : null}
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div
                      style={{
                        color: "#ff4400",
                        display: "flex",
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{ marginLeft: "auto", cursor: "pointer" }}
                        onClick={() => openModalUpdate(item.id)}
                      >
                        Cập nhập
                      </div>
                      {item.status !== "DANG_SU_DUNG" ? (
                        <div
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                          onClick={() => deleteAddressClient(item.id)}
                        >
                          Xoá
                        </div>
                      ) : null}
                    </div>
                    {item.status !== "DANG_SU_DUNG" ? (
                      <Tooltip title="Thiết lập mặc định">
                        <div
                          className="add-default-address-account"
                          onClick={() => setDefault(item.id, id)}
                        >
                          Thiết lập mặc định
                        </div>
                      </Tooltip>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ModalCreateAddress
        modalCreate={modalCreate}
        setModalCreate={setModalCreate}
      />
      <ModalUpdateAddress
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        id={idAddress}
      />
    </React.Fragment>
  );
}

export default Profile;