import { faEye, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row, Table } from "antd";
import "./style-bill.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BillApi } from "../../../api/employee/bill/bill.api";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ModalAccountEmployee from "./modal/ModalAccountEmployee";
import { useReactToPrint } from "react-to-print";
import TextArea from "antd/es/input/TextArea";

function TabBills({ statusBill, dataFillter, addNotify, quantityNotify }) {
  const [dataBill, setDataBill] = useState([]);
  const [dataIdCheck, setDataIdCheck] = useState([]);
  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = Stomp.over(socket);

  const formatCurrency = (value) => {
    if (value == 0) {
      return "0 VND";
    }
    if (value <= 100) {
      return `${value} %`;
    }
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Tên nhân viên",
      dataIndex: "nameEmployees",
      key: "nameEmployees",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tiền giảm",
      dataIndex: "itemDiscount",
      key: "itemDiscount",
      render: (itemDiscount) => <span>{formatCurrency(itemDiscount)}</span>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (totalMoney) => <span>{formatCurrency(totalMoney)}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) => a.createdDate - b.createdDate,
      render: (text) => {
        const formattedDate = moment(text).format("HH:mm:ss DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <Button
          style={{
            border: "none",
            textAlign: "center",
            backgroundColor: "#1677ff",
            marginLeft: "35px",
          }}
          title="Chi tiết hóa đơn"
        >
          <Link to={`/bill-management/detail-bill/${id}`}>
            <FontAwesomeIcon icon={faEye} style={{ color: "white" }} />
          </Link>
        </Button>
      ),
    },
  ];

  const [fillter, setFillter] = useState({
    startTimeString: dataFillter.startTimeString,
    endTimeString: dataFillter.endTimeString,
    status: [statusBill],
    endDeliveryDateString: dataFillter.endDeliveryDateString,
    startDeliveryDateString: dataFillter.startDeliveryDateString,
    key: dataFillter.key,
    employees: dataFillter.employees,
    user: dataFillter.user,
    phoneNumber: dataFillter.phoneNumber,
    type: dataFillter.type,
    page: 0,
  });

  useEffect(() => {
    const data = {
      startTimeString: dataFillter.startTimeString,
      endTimeString: dataFillter.endTimeString,
      status: statusBill
        ? [statusBill]
        : [
            "CHO_XAC_NHAN",
            "XAC_NHAN",
            "CHO_VAN_CHUYEN",
            "VAN_CHUYEN",
            "DA_THANH_TOAN",
            "THANH_CONG",
            "TRA_HANG",
            "DA_HUY",
          ],
      endDeliveryDateString: dataFillter.endDeliveryDateString,
      startDeliveryDateString: dataFillter.startDeliveryDateString,
      key: dataFillter.key,
      employees: dataFillter.employees,
      user: dataFillter.user,
      phoneNumber: dataFillter.phoneNumber,
      type: dataFillter.type,
      page: 0,
    };

    const fetchData = async () => {
      try {
        const res = await BillApi.fetchAll(data);
        setDataBill(res.data.data);
        console.log(statusBill);
        console.log("setdatabill", dataBill);

        if (statusBill) {
          addNotify({
            status: statusBill,
            quantity: res.data.data.length,
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Có lỗi xảy ra!");
      }
    };

    fetchData();

    // WebSocket setup
    stompClient.connect({}, () => {
      const subscription = stompClient.subscribe(
        "/app/admin-notifications",
        async (response) => {
          await fetchData();
        }
      );

      // Cleanup subscription
      return () => {
        subscription.unsubscribe();
        if (stompClient.connected) {
          stompClient.disconnect();
        }
      };
    });
  }, [statusBill]);

  useEffect(() => {
    var data = dataFillter;
    dataFillter.status = [statusBill];
    if (statusBill == "") {
      data.status = [
        "CHO_XAC_NHAN",
        "XAC_NHAN",
        "CHO_VAN_CHUYEN",
        "VAN_CHUYEN",
        "DA_THANH_TOAN",
        "THANH_CONG",
        "TRA_HANG",
        "DA_HUY",
      ];
    }
    BillApi.fetchAll(data)
      .then((res) => {
        setDataBill(res.data.data);
        if (statusBill != "") {
          addNotify({
            status: statusBill,
            quantity: res.data.data.length,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [dataFillter]);

  // const convertString = (key) => {
  //   return key === ""
  //     ? "Tất cả"
  //     : key === "CHO_XAC_NHAN "
  //     ? "xác nhận"
  //     : key === "XAC_NHAN"
  //     ? "Chờ vận chuyển"
  //     : key === "CHO_VAN_CHUYEN"
  //     ? " Vận chuyển"
  //     : key === "VAN_CHUYEN"
  //     ? "Xác nhận thanh Toán"
  //     : key === "DA_THANH_TOAN"
  //     ? "Hoàn thành"
  //     : key === "THANH_CONG"
  //     ? "Hoàn thành"
  //     : "Hủy";
  // };

  const nextStatusBill = () => {
    return statusBill == "CHO_XAC_NHAN"
      ? "XAC_NHAN"
      : statusBill == "XAC_NHAN"
      ? "CHO_VAN_CHUYEN"
      : statusBill == "CHO_VAN_CHUYEN"
      ? "VAN_CHUYEN"
      : statusBill == "VAN_CHUYEN"
      ? "DA_THANH_TOAN"
      : statusBill == "DA_THANH_TOAN"
      ? "THANH_CONG"
      : "HUY";
  };

  const generatePDF = useReactToPrint({
    content: () => document.getElementById("pdfContent"),
    documentTitle: "Userdata",
    onAfterPrint: () => {},
  });

  // const changeStatusBill = (e) => {
  //   Modal.confirm({
  //     title: "Xác nhận",
  //     content: (
  //       <div>
  //         <p>{`Bạn có đồng ý ${convertString(statusBill)} không?`}</p>
  //         <TextArea
  //           rows={4}
  //           placeholder="Nhập ghi chú..."
  //           id="myTextAreaChangeStatus"
  //         />
  //       </div>
  //     ),
  //     okText: "Đồng ý",
  //     cancelText: "Hủy",
  //     onOk: async () => {
  //       var note = document.getElementById("myTextAreaChangeStatus").value;
  //       if (note.trim() != "" && note.trim().length > 10) {
  //         var data = {
  //           ids: dataIdCheck,
  //           status: nextStatusBill(),
  //           note: note,
  //         };
  //         if (statusBill == "XAC_NHAN") {
  //           BillApi.fetchAllFilePdfByIdBill(data)
  //             .then((response) => {
  //               document.getElementById("pdfContent").innerHTML =
  //                 response.data.data;
  //               generatePDF();
  //               console.log(response);
  //             })
  //             .catch((error) => {
  //               toast.error(error.response.data.message);
  //             });
  //         }
  //         await BillApi.changeStatusAllBillByIds(data)
  //           .then((response) => {
  //             if (response.data.data == true) {
  //               toast.success(`${convertString(statusBill)} thành công`);
  //             }
  //           })
  //           .catch((error) => {
  //             toast.error(error.response.data.message);
  //           });
  //         await BillApi.fetchAll(fillter)
  //           .then((res) => {
  //             setDataBill(res.data.data);
  //           })
  //           .catch((error) => {
  //             toast.error(error.response.data.message);
  //           });
  //       } else {
  //         toast.warning("Vui lòng nhập mô tả và tối thiểu 10 ký tự ");
  //       }
  //     },
  //     onCancel: () => {},
  //   });
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    BillApi.fetchAll(fillter)
      .then((res) => {
        setDataBill(res.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    BillApi.fetchAll(fillter)
      .then((res) => {
        setDataBill(res.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div style={{ width: "100%", marginTop: "0px" }}>
      <Row style={{ width: "100%" }}>
        <Table
          dataSource={dataBill}
          rowKey="id"
          style={{ width: "100%", marginTop: "0px" }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            className: "custom-pagination", // Thêm lớp tùy chỉnh ở đây
          }}
          rowSelection={{
            type: "checkbox",
            onSelectRow: (keys) => {},
            onSelectAll: (checked) => {
              if (checked) {
                setDataIdCheck(dataBill.map((row) => row.id));
              } else {
                setDataIdCheck([]);
              }
            },
            onSelect: (keys, checked) => {
              if (checked) {
                setDataIdCheck([...dataIdCheck, keys.id]);
              } else {
                var data = [...dataIdCheck];
                const index = data.indexOf(keys.id);
                if (index > -1) {
                  data.splice(index, 1);
                }
                setDataIdCheck(data);
              }
            },
          }}
          className="bill-table"
        />
      </Row>
      {statusBill != "" &&
      statusBill != "DA_HUY" &&
      statusBill != "THANH_CONG" ? (
        <Row style={{ width: "100%", marginTop: "15px" }} justify={"end"}>
          {/* <Col span={3} style={{ marginRight: "10px" }}>
            <Button onClick={(e) => changeStatusBill(e)}>
              {convertString(statusBill)}
            </Button>
          </Col> */}
          <Col span={3} style={{ marginRight: "10px" }}>
            <Button onClick={showModal}>Chọn nhân viên</Button>
          </Col>
        </Row>
      ) : (
        <Row></Row>
      )}
      <Modal
        title="Chuyển hóa đơn cho nhân viên "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1100}
      >
        <ModalAccountEmployee
          dataIdCheck={dataIdCheck}
          handleCancel={handleCancel}
          status={true}
        />
      </Modal>
      <div style={{ display: "none" }}>
        <div id="pdfContent" />
      </div>
    </div>
  );
}

export default TabBills;
