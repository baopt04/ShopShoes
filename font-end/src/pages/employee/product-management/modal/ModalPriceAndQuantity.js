import { Button, Form, Input, InputNumber, Modal } from "antd";

export default function ModalPriceAndQuantity({ open, onCancel, onUpdate }) {
  const [form] = Form.useForm();
  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return "100.000.000 VND";
    } else if (value < 1) {
      return "1 VND";
    } else {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
      });
      return formatter.format(value);
    }
  };
  const handleOkQuantityAndPrice = () => {
    form
      .validateFields()
      .then((values) => {
        const rawPrice = values.priceCustom.replace(/\D/g, "");
        onUpdate({
          ...values,
          priceCustom: rawPrice,
        });
        onCancel();
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa giá và số lượng sản phẩm"
      visible={open}
      onOk={handleOkQuantityAndPrice}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleOkQuantityAndPrice}>
          Chỉnh sửa
        </Button>,
      ]}
    >
      <Form
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item
          label="Số lượng"
          name="quantityCustom"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng!",
            },
            {
              type: "number",
              min: 1,
              message: "Vui lòng nhập số lượng lớn hơn 1",
            },
            {
              type: "number",
              max: 10000,
              message: "Vui lòng nhập số lượng nhỏ hơn 10000",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Đơn giá"
          name="priceCustom"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đơn giấ tiền!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              const inputValue = e.target.value.replace(/\D/g, "");
              form.setFieldsValue({
                priceCustom: formatCurrency(inputValue),
              });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
