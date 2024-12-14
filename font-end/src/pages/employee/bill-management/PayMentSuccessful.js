import {
  faSquareCheck,
  faTriangleExclamation,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PaymentsMethodApi } from "../../../api/employee/paymentsmethod/PaymentsMethod.api";
import "./style-payment-success.css";
import { Button } from "antd";
import { toast } from "react-toastify";
import { BillApi } from "../../../api/employee/bill/bill.api";
import { useReactToPrint } from "react-to-print";

const getUrlVars = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const parameters = {};
  for (const [key, value] of urlParams.entries()) {
    if (key === "vnp_TxnRef" || key === "vnp_TransactionStatus") {
      parameters[key] = value;
    }
  }
  return parameters;
};

const saveToLocalStorage = (parameters) => {
  localStorage.setItem("parameters", JSON.stringify(parameters));
};

const fetchData = () => {
  const parameters = getUrlVars();
  saveToLocalStorage(parameters);
};

const getTransactionStatus = () => {
  const urlParams = new URLSearchParams(window.location.search);
  var parameters = "";
  for (const [key, value] of urlParams.entries()) {
    if (key === "vnp_TransactionStatus") {
      parameters = value;
    }
  }
  return parameters;
};

const getAmount = () => {
  const urlParams = new URLSearchParams(window.location.search);
  var parameters = "";
  for (const [key, value] of urlParams.entries()) {
    if (key === "vnp_Amount") {
      parameters = value;
    }
  }
  return parameters;
};

function PayMentSuccessful() {
  getUrlVars();
  console.log(new URLSearchParams(window.location.search));
  const [status, setStatus] = useState();
  const [amount, setAmount] = useState();
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };

  const generatePDF = useReactToPrint({
    content: () => document.getElementById("pdfContent"),
    documentTitle: "Userdata",
    onAfterPrint: () => {},
  });
  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    fetchData();
    setStatus(getTransactionStatus());
    setAmount(getAmount());
    PaymentsMethodApi.checkPaymentVnPay(param)
      .then((res) => {
        setLoadLink(false);
        BillApi.fetchHtmlIdBill(param.get("vnp_TxnRef").split("-")[0], 0).then(
          (res) => {
            document.getElementById("pdfContent").innerHTML = res.data.data;
            generatePDF();
          }
        );
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const createFireworks = (num = 10) => {
    const fireworks = [];
    for (let i = 0; i < num; i++) {
      const color = getRandomColor(); // Màu ngẫu nhiên cho mỗi quả pháo
      fireworks.push(
        <div
          key={i}
          className="firework"
          style={{ backgroundColor: color }}
        ></div>
      );
    }
    return fireworks;
  };
  const [loadLink, setLoadLink] = useState(true);

  return (
    <>
      <div className="fireworks-container">
        {/* Hiển thị các pháo từ vị trí ngẫu nhiên */}
        {createFireworks(10)}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {status == "00" ? (
          <div className="content-payment-success">
            <h1 style={{ fontSize: "20px" }}>Thanh toán đơn hàng thành công</h1>
            <div style={{ marginTop: "7%", fontSize: "16px" }}>
              Tổng tiền đơn hàng thanh toán: {formatCurrency(amount / 100)}
            </div>
            <Button
              disabled={loadLink}
              style={{
                border: "none",
                backgroundColor: "#f5f5dc00",
                color: loadLink ? "#ccc" : "#1677ff",
                marginTop: "5%",
              }}
            >
              <Link to="/sale-counter">Quay trở lại bán hàng</Link>
            </Button>
          </div>
        ) : (
          <div className="content-payment-success">
            <FontAwesomeIcon
              className="icon-payment-fail"
              icon={faTriangleExclamation}
            />
            <h1>Thanh toán thất bại</h1>
            <div>
              <Button
                disabled={loadLink}
                style={{
                  border: "none",
                  backgroundColor: "#f5f5dc00",
                  color: loadLink ? "#ccc" : "#1677ff",
                }}
              >
                <Link to="/sale-counter">Tiếp tục bán hàng</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "none" }}>
        <div id="pdfContent" />
      </div>
    </>
  );
}

export default PayMentSuccessful;
