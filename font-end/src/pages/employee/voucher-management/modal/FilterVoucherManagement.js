import React, { useState } from "react";
import { Form, Input, Modal, Select, Button } from "antd";

const { Option } = Select;

function FilterVoucherManagement({ modalFilter, setModalFilter, onFilter }) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    value: "",
    quantity: "",
    status: undefined,
  });

  const inputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const closeModal = () => {
    setModalFilter(false);
  };

  const clearModal = () => {
    setFormData({
      code: "",
      name: "",
      value: "",
      quantity: "",
      status: undefined,
    });
  };

  const handleSubmit = () => {
    // Kiểm tra xem onFilter có phải là một hàm không
    if (typeof onFilter === "function") {
      onFilter(formData); // Gọi hàm onFilter và truyền formData
      closeModal();
    } else {
      console.error("onFilter is not a function");
    }
  };

  return (
    <Modal
      title="Lọc phiếu giảm giá"
      visible={modalFilter}
      onCancel={closeModal}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Form layout="vertical">
        <Form.Item label="Mã khuyến mãi">
          <Input
            name="code"
            type="text"
            placeholder="Tìm kiếm"
            value={formData["code"]}
            onChange={(e) => inputChange("code", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Tên khuyến mãi">
          <Input
            name="name"
            type="text"
            placeholder="Tìm kiếm"
            value={formData["name"]}
            onChange={(e) => inputChange("name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Giá trị giảm">
          <Input
            name="value"
            type="number"
            placeholder="Tìm kiếm"
            value={formData["value"]}
            onChange={(e) => inputChange("value", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Số lượng tồn">
          <Input
            name="quantity"
            type="number"
            placeholder="Tìm kiếm"
            value={formData["quantity"]}
            onChange={(e) => inputChange("quantity", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Select
            name="status"
            placeholder="Tìm kiếm"
            value={formData["status"]}
            onChange={(value) => inputChange("status", value)}
          >
            <Option value="">Tất cả</Option>
            <Option value="DANG_SU_DUNG">Còn hạn</Option>
            <Option value="KHONG_SU_DUNG">Hết hạn</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <div style={{ float: "right" }}>
            <Button onClick={closeModal}>Hủy</Button>
            <Button onClick={clearModal} style={{ marginLeft: "20px" }}>
              Làm mới
            </Button>
            <Button
              className="button-add-promotion"
              onClick={handleSubmit}
              style={{ marginLeft: "20px" }}
            >
              Lọc
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FilterVoucherManagement;
