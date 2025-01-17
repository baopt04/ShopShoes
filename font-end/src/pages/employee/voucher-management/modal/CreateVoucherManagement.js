import React, { useEffect, useState } from "react";
import "./../style-voucher.css";
import { Form, Input, Button, Modal, InputNumber, DatePicker } from "antd";
import { VoucherApi } from "../../../../api/employee/voucher/Voucher.api";
import { CreateVoucher } from "../../../../app/reducer/Voucher.reducer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../../../app/hook";
dayjs.extend(utc);
function CreateVoucherManagement({ modalCreate, setModalCreate }) {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({
    value: "", // Phần trăm giảm
    value1: "",
  });
  const [disablevalue, setDisableValue] = useState(false);
  const [disableValue1, setDisableValue1] = useState(false);
  const dispatch = useAppDispatch();
  const inputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {}, [formData]);
  const convertToLong = () => {
    const convertedFormData = { ...formData };
    if (formData.startDate) {
      convertedFormData.startDate = dayjs(formData.startDate).unix() * 1000;
    }
    if (formData.endDate) {
      convertedFormData.endDate = dayjs(formData.endDate).unix() * 1000;
    }
    return convertedFormData;
  };

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return "10.000.000 VND";
    } else {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
      });
      return formatter.format(value);
    }
  };
  const formatCurrencyMaxDiscount = (value) => {
    if (value >= 10000000) {
      return "10.000.000 VND";
    } else {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
      });
      return formatter.format(value);
    }
  };
  const formatDiscountValue = (value) => {
    if (value === undefined || value === null) return "";

    if (value > 100 && value <= 999) {
      return "100%";
    } else if (value <= 100) {
      return `${value} %`;
    } else if (value >= 10000000) {
      return "10.000.000 VND";
    } else {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
      });
      return formatter.format(value);
    }
  };

  const handleSubmit = () => {
    Modal.confirm({
      title: "Xác nhận thêm",
      content: "Bạn có chắc chắn muốn thêm phiếu giảm giá ?",
      okText: "Thêm",
      cancelText: "Hủy",
      onOk() {
        const isFormValid =
          formData.name &&
          formData.value &&
          formData.quantity &&
          formData.startDate &&
          formData.endDate &&
          formData.startDate < formData.endDate &&
          formData.endDate > dayjs().valueOf() &&
          formData.name.length <= 50;

        if (!isFormValid) {
          const errors = {
            name: !formData.name
              ? "Vui lòng nhập tên khuyến mãi"
              : formData.name.length > 50
              ? "Tên khuyến mãi không được vượt quá 50 ký tự"
              : "",
            value: !formData.value ? "Vui lòng nhập giá giảm" : "",
            startDate: !formData.startDate ? "Vui lòng chọn ngày bắt đầu" : "",
            quantity: !formData.quantity ? "Vui lòng nhập số lượng" : "",
            endDate: !formData.endDate
              ? "Vui lòng chọn ngày kết thúc"
              : formData.startDate >= formData.endDate
              ? "Ngày kết thúc phải lớn hơn ngày bắt đầu"
              : formData.endDate <= dayjs().valueOf()
              ? "Ngày kết thúc phải lớn hơn hiện tại"
              : "",
          };
          setFormErrors(errors);
          console.log("Check error", errors);

          return;
        }

        VoucherApi.create(convertToLong())
          .then((res) => {
            dispatch(CreateVoucher(res.data.data));
            toast.success("Thêm thành công!", {
              autoClose: 5000,
            });

            closeModal();
          })
          .catch((error) => {
            if (error.response.data.message === "BS-400") {
              toast.success("Vui lòng nhập đầy đủ!", {
                autoClose: 5000,
              });
              return;
            }
          });
      },
    });
  };

  const closeModal = () => {
    setModalCreate(false);
    setFormData([]);
    setFormErrors([]);
  };

  const formatMoney = (price) => {
    return (
      parseInt(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
    );
  };
  return (
    <div>
      <Modal
        title="Thêm phiếu giảm giá"
        visible={modalCreate}
        onCancel={closeModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form layout="vertical">
          <Form.Item
            label="Tên phiếu giảm giá"
            validateStatus={formErrors["name"] ? "error" : ""}
            help={formErrors["name"] || ""}
          >
            <Input
              name="name"
              className="input-create-voucher"
              placeholder="Tên phiếu giảm giá"
              value={formData["name"]}
              onChange={(e) => {
                inputChange("name", e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Giá trị giảm"
            validateStatus={formErrors["value"] ? "error" : ""}
            help={formErrors["value"] || ""}
          >
            <InputNumber
              name="value"
              placeholder="Giá trị giảm"
              className="input-create-voucher"
              value={formData["value"]}
              onChange={(value) => {
                if (value > 100) {
                  inputChange("maxDiscount", 0);
                }
                inputChange("value", value);
              }}
              min="1"
              formatter={(value) => formatDiscountValue(value)}
              parser={(value) => value.replace(/[^\d]/g, "")}
            />
          </Form.Item>

          <Form.Item label="Đơn tối thiểu">
            <InputNumber
              name="minimumBill"
              placeholder="Đơn tối thiểu"
              className="input-create-voucher"
              value={formData["minimumBill"]}
              onChange={(value) => {
                inputChange("minimumBill", value);
              }}
              min="10000"
              formatter={(value) => formatCurrency(value)}
              parser={(value) => value.replace(/[^\d]/g, "")}
            />
          </Form.Item>
          <Form.Item label="Giảm tối đa" hidden={formData["value"] > 100}>
            <InputNumber
              name="maxDiscount"
              placeholder="Giảm tối đa"
              className="input-create-voucher"
              value={formData["maxDiscount"]}
              onChange={(value) => {
                inputChange("maxDiscount", value);
              }}
              min="10000"
              formatter={(value) => formatCurrencyMaxDiscount(value)}
              // disabled={formData["value"] > 100}
              parser={(value) => value.replace(/[^\d]/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            validateStatus={formErrors["quantity"] ? "error" : ""}
            help={formErrors["quantity"] || ""}
          >
            <InputNumber
              name="quantity"
              placeholder="Số lượng"
              className="input-create-voucher"
              value={formData["quantity"]}
              onChange={(value) => {
                inputChange("quantity", value);
              }}
              min="1"
              max="10000"
            />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            validateStatus={formErrors["startDate"] ? "error" : ""}
            help={formErrors["startDate"] || ""}
          >
            <DatePicker
              showTime
              name="startDate"
              placeholder="Ngày bắt đầu"
              className="input-create-voucher"
              value={formData["startDate"]}
              onChange={(value) => {
                inputChange("startDate", value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            validateStatus={formErrors["endDate"] ? "error" : ""}
            help={formErrors["endDate"] || ""}
          >
            <DatePicker
              showTime
              name="endDate"
              placeholder="Ngày kết thúc"
              className="input-create-voucher"
              value={formData["endDate"]}
              onChange={(value) => {
                inputChange("endDate", value);
              }}
            />
          </Form.Item>

          <Form.Item>
            <div style={{ float: "right" }}>
              <Button onClick={closeModal}>Hủy</Button>
              <Button
                className="button-add-promotion"
                key="submit"
                title="Thêm"
                onClick={handleSubmit}
                style={{ marginLeft: "20px" }}
              >
                Thêm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateVoucherManagement;
