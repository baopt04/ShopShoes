import { faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { UpdatePromotion } from "../../../app/reducer/Promotion.reducer";

import { ProducDetailtApi } from "../../../api/employee/product-detail/productDetail.api";
import { ProductApi } from "../../../api/employee/product/product.api";
import { PromotionApi } from "../../../api/employee/promotion/Promotion.api";
import {
  GetProductDetail,
  SetProductDetail,
} from "../../../app/reducer/ProductDetail.reducer";
import { useNavigate } from "react-router-dom";

function UpdatePromotionManagement() {
  const dispatch = useAppDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [formSearch, setFormSearch] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysDetail, setSelectedRowKeysDetail] = useState([]);
  const [list, setList] = useState([]);
  const [listProductDetail, setListProductDetail] = useState([]);
  const [modal, setModal] = useState(false);
  const [listPromotion, setListPromotion] = useState([]);
  const nav = useNavigate();

  const datas = useAppSelector(GetProductDetail);
  useEffect(() => {
    if (datas != null) {
      SetProductDetail(datas);
    }
  }, [datas]);

  const id = localStorage.getItem("id");
  useEffect(() => {
    console.log(id);
    if (id !== null) {
      console.log(id);
      PromotionApi.getOne(id).then(
        (res) => {
          console.log(res.data.data);
          const getDetailPromotion = res.data.data;
          setFormData({
            code: getDetailPromotion.code,
            name: getDetailPromotion.name,
            value: getDetailPromotion.value,
            startDate: dayjs(getDetailPromotion.startDate),
            endDate: dayjs(getDetailPromotion.endDate),
            status: getDetailPromotion.status,
          });

          if (getDetailPromotion.product !== null) {
            setSelectedRowKeys(getDetailPromotion.product.split(","));
            console.log(getDetailPromotion.product.split(","));
          } else {
            setSelectedRowKeys([]);
          }
          if (getDetailPromotion.productDetail !== null) {
            setSelectedRowKeysDetail(
              getDetailPromotion.productDetail.split(",")
            );
          } else {
            setSelectedRowKeysDetail([]);
          }
        },
        (err) => console.log(err)
      );
    }
  }, []);

  useEffect(() => {
    loadDataProduct();
    console.log(loadDataProduct());
  }, [formSearch]);

  useEffect(() => {
    console.log(listProductDetail);
  }, [listProductDetail]);

  useEffect(() => {
    console.log("Check product detail", selectedRowKeysDetail);
  }, [selectedRowKeysDetail]);

  useEffect(() => {
    for (const key of selectedRowKeys) {
      getProdutDetailByproduct(key);
    }
    setListProductDetail(updatedListProductDetail);

    console.log(selectedRowKeys);
  }, [selectedRowKeys]);

  const updatedListProductDetail = listProductDetail.filter((item) =>
    selectedRowKeys.includes(item.id)
  );

  const loadDataProduct = () => {
    ProductApi.getProductUse(formSearch).then(
      (res) => {
        setList(res.data.data);
        dispatch(SetProductDetail(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getProdutDetailByproduct = (id) => {
    ProducDetailtApi.getByIdProduct(id).then(
      (res) => {
        setListProductDetail((prevListProductDetail) => [
          ...prevListProductDetail,
          ...res.data.data,
        ]);
        console.log(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const closeModal = () => {
    setModal(false);
    setListPromotion([]);
  };
  const openModal = (id) => {
    PromotionApi.getByProductDetail(id).then(
      (res) => {
        setListPromotion(res.data.data);
        console.log(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
    setModal(true);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSelectChangeDetail = (newSelectedRowKeys) => {
    setSelectedRowKeysDetail(newSelectedRowKeys);
  };

  const rowSelectionDetail = {
    selectedRowKeys: selectedRowKeysDetail,
    onChange: onSelectChangeDetail,
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleInputChangeSearch = (name, value) => {
    setFormSearch({ ...formSearch, [name]: value });
  };

  const convertToLong = () => {
    const convertedFormData = {
      ...formData,
      idProductDetails: selectedRowKeysDetail,
    };
    if (formData.startDate) {
      convertedFormData.startDate = dayjs(formData.startDate).unix() * 1000;
    }
    if (formData.endDate) {
      convertedFormData.endDate = dayjs(formData.endDate).unix() * 1000;
    }
    return convertedFormData;
  };
  const handleSubmit = (ids) => {
    Modal.confirm({
      title: "Xác nhận chỉnh sửa",
      content: "Bạn có chắc chắn muốn chỉnh sửa khuyến mại ?",
      okText: "Chỉnh sửa",
      cancelText: "Hủy",
      onOk() {
        const isFormValid =
          formData.code &&
          formData.name &&
          formData.value &&
          formData.startDate &&
          formData.endDate &&
          formData.startDate < formData.endDate &&
          formData.name.length <= 50;

        if (!isFormValid) {
          const errors = {
            code: !formData.code ? "Vui lòng nhập mã khuyễn mại" : "",
            name: !formData.name
              ? "Vui lòng nhập tên khuyến mãi"
              : formData.name.length > 50
              ? "Tên khuyến mãi không được vượt quá 50 ký tự"
              : "",
            value: !formData.value ? "Vui lòng nhập giá giảm" : "",
            startDate: !formData.startDate ? "Vui lòng chọn ngày bắt đầu" : "",
            endDate: !formData.endDate
              ? "Vui lòng chọn ngày kết thúc"
              : formData.startDate >= formData.endDate
              ? "Ngày kết thúc phải lớn hơn ngày bắt đầu"
              : "",
          };
          setFormErrors(errors);
          return;
        }

        PromotionApi.update(ids, convertToLong()).then((res) => {
          dispatch(UpdatePromotion(res.data.data));
          toast.success("Cập nhập thành công!", {
            autoClose: 5000,
          });
          nav("/promotion-management");
        });
        setFormData({});
        setListProductDetail([]);
        onSelectChange("");
        onSelectChangeDetail("");
        setSelectedRowKeysDetail("");
      },
    });
  };
  const fields = [
    {
      name: "code",
      type: "text",
      label: "Mã khuyễn mại",
      text: "mã khuyễn mại",
      readOnly: true,

      class: "input-form-promotion",
    },
    {
      name: "name",
      type: "text",
      label: "Tên khuyễn mại",
      text: "tên khuyễn mại",
      class: "input-form-promotion",
    },
    {
      name: "value",
      type: "number",
      label: "Giá trị giảm",
      text: "giá trị giảm",
      class: "input-form-promotion",
      formatter: (value) => `${value}%`,
    },
    {
      name: "startDate",
      type: "date",
      label: "Ngày bắt đầu",
      text: "ngày bắt đầu",
      class: "input-form-promotion",
    },
    {
      name: "endDate",
      type: "date",
      label: "Ngày kết thúc",
      text: "ngày kết thúc",
      class: "input-form-promotion",
    },
    {
      name: "status",
      type: "select",
      label: "Trạng thái",
      options: [
        { value: "DANG_SU_DUNG", label: "Còn hạn" },
        { value: "KHONG_SU_DUNG", label: "Hết hạn" },
      ],
      text: "trạng thái",
      class: "input-form-promotion",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const genderClass =
          text === "DANG_SU_DUNG" ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text === "DANG_SU_DUNG" ? "Đang sử dụng " : "Không sử dụng"}
          </button>
        );
      },
    },
  ];
  const columnsDetailproduct = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div style={{ width: "90px", height: "90px" }}>
          <div
            style={{
              backgroundImage: `url(${text})`,
              width: "100%",
              height: "100%",
              backgroundSize: "cover", // Đặt kích thước để hình ảnh bao phủ toàn bộ phần tử
              backgroundPosition: "center", // Đặt vị trí của hình ảnh là trung tâm
              borderRadius: "5px",
              position: "relative",
            }}
          >
            {record.value !== null && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                }}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{
                    fontSize: "3em",
                    color: record.value > 50 ? "red" : "#ffcc00",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    fontSize: "11px",
                    color: record.value > 50 ? "white" : "black", // Màu của văn bản
                    zIndex: 1, // Đặt độ sâu trên cùng
                    textAlign: "center",
                  }}
                >
                  Giảm {record.value}%
                </span>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (text) => {
        if (text === "NAM") return "Nam";
        if (text === "NU") return "Nữ";
        if (text === "NAM_VA_NU") return "Nam và Nữ";
        return text;
      },
    },
    {
      title: "Kích thước",
      dataIndex: "nameSize",
      key: "nameSize",
    },
    {
      title: "Màu",
      dataIndex: "codeColor",
      key: "codeColor",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button style={{ backgroundColor: record.codeColor }} />
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const genderClass =
          text === "DANG_SU_DUNG" ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text === "DANG_SU_DUNG" ? "Đang sử dụng " : "Không sử dụng"}
          </button>
        );
      },
    },
  ];
  const columnsPromotion = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Ảnh sản phẩm"
          style={{ width: "70px", borderRadius: "5px" }}
        />
      ),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tên khuyễn mại",
      dataIndex: "namePromotion",
      key: "namePromotion",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Giá trị khuyến mại",
      dataIndex: "valuePromotion",
      key: "valuePromotion",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Áp dụng khuyến mại",
      dataIndex: "statusPromotion",
      key: "statusPromotion",
      render: (text) => {
        const genderClass =
          text === "DANG_SU_DUNG" ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text === "DANG_SU_DUNG" ? "Đang sử dụng " : "Không sử dụng"}
          </button>
        );
      },
    },
  ];
  const updatedList = list.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));

  const updatedListDetail = listProductDetail.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));
  const updatedListPromotion = listPromotion.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));
  return (
    <div>
      <Row>
        <Col className="get-product" lg={{ span: 16, offset: 0 }}>
          <Col>
            <br></br>
            <br></br>
            <h1>Sản phẩm</h1>
            <div
              style={{
                display: "flex",
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Tìm kiếm</p>{" "}
              <Input
                placeholder="Mã hoặc tên sản phẩm"
                style={{ width: 400, height: 40, marginLeft: 20 }}
                onChange={(e) =>
                  handleInputChangeSearch("keyword", e.target.value)
                }
              />
            </div>
            <Table
              rowKey="id"
              columns={columns}
              rowSelection={rowSelection}
              dataSource={updatedList}
              pagination={{ pageSize: 10 }}
              // onRow={(record) => ({
              //   onClick: () => {
              //     const newSelectedRowKeys = [...selectedRowKeys];
              //     if (newSelectedRowKeys.includes(record.id)) {
              //       const index = newSelectedRowKeys.indexOf(record.id);
              //       newSelectedRowKeys.splice(index, 1);
              //     } else {
              //       newSelectedRowKeys.push(record.id);
              //     }
              //     setSelectedRowKeys(newSelectedRowKeys);
              //   },
              // })}
            />
          </Col>
          <Col>
            <div>
              <h1>Chi tiết sản phẩm</h1>
              <br></br>
              <Table
                rowKey="id"
                columns={columnsDetailproduct}
                rowSelection={rowSelectionDetail}
                dataSource={updatedListDetail.filter(
                  (item) => item.status === "DANG_SU_DUNG"
                )}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </Col>
        </Col>
        <Col className="add-promotion" lg={{ span: 7, offset: 0 }}>
          <div className="title-add-promotion">
            <h4>Cập nhập đợt giảm giá</h4>
          </div>

          <Form layout="vertical" autoComplete="off">
            {fields.map((field, index) => {
              return (
                <div key={index}>
                  <Form.Item
                    label={field.label}
                    validateStatus={formErrors[field.name] ? "error" : ""}
                    help={formErrors[field.name] || ""}
                  >
                    {field.type === "number" && (
                      <InputNumber
                        className={field.class}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name] || ""}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                        min="1"
                        max="80"
                        formatter={field.formatter}
                      />
                    )}
                    {field.type === "date" && (
                      <DatePicker
                        showTime
                        className={field.class}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name]}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                        format="HH:mm:ss DD-MM-YYYY"
                      />
                    )}
                    {field.type === "select" && (
                      <Input
                        disable
                        className="status"
                        name="status"
                        value={
                          formData["status"] === "DANG_KICH_HOAT"
                            ? "Đang kích hoạt"
                            : (formData["status"] === "CHUA_KICH_HOAT"
                                ? "Chưa kích hoạt"
                                : "Ngưng kích hoạt") || ""
                        }
                      ></Input>
                    )}

                    {field.type !== "date" &&
                      field.type !== "select" &&
                      field.type !== "number" && (
                        <Input
                          className={field.class}
                          name={field.name}
                          placeholder={field.label}
                          value={formData[field.name] || ""}
                          onChange={(e) => {
                            handleInputChange(field.name, e.target.value);
                          }}
                        />
                      )}
                  </Form.Item>
                </div>
              );
            })}

            <Form.Item label=" ">
              <Button
                className="button-add-promotion"
                key="submit"
                title="Cập nhập"
                onClick={() => handleSubmit(id)}
              >
                Cập nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      {modal && (
        <Modal
          title="Chi tiết sản phẩm - khuyễn mại"
          visible={modal}
          onCancel={closeModal}
          okButtonProps={{ style: { display: "none" } }}
          width={1000}
        >
          <div>
            <Table
              rowKey="code"
              columns={columnsPromotion}
              dataSource={updatedListPromotion}
              pagination={{ pageSize: 10 }}
              style={{ margin: "50px" }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UpdatePromotionManagement;
