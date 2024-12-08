import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AiFillCarryOut } from "react-icons/ai";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import "./style-bill-detail-account.css";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import dayjs from "dayjs";
import { BillHistoryClientApi } from "../../../../../api/customer/billhistory/billHistoryClient.api";
import { BillClientApi } from "../../../../../api/customer/bill/billClient.api";
import { PaymentMethodClientApi } from "../../../../../api/customer/paymentmethod/PaymentMethod.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { LiaFileSignatureSolid, LiaShippingFastSolid } from "react-icons/lia";
import { PiShieldCheckFill } from "react-icons/pi";
import { FcShipped } from "react-icons/fc";
import { MdPayments } from "react-icons/md";

function BillDetailAccount() {
  const id = useParams();
  const nav = useNavigate();
  const [listBillHistory, setListBillHistory] = useState([]);
  const [statusPresent, setStatusPresent] = useState([]);
  const [bill, setBill] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const getColorByStatus = (status) => {
    switch (status) {
      case "TAO_HOA_DON":
        return "#FFD700";
      case "CHO_XAC_NHAN":
        return "#FFA500";
      case "XAC_NHAN":
        return "#00FF00";
      case "CHO_VAN_CHUYEN":
        return "#1E90FF";
      case "VAN_CHUYEN":
        return "#8A2BE2";
      case "DA_THANH_TOAN":
        return "#32CD32";
      case "TRA_HANG":
        return "#FF6347";
      case "THANH_CONG":
        return "#228B22";
      case "DA_HUY":
        return "#FF0000";
      default:
        return "#808080";
    }
  };
  const showIcon = (statusBill) => {
    if (statusBill === "CHO_XAC_NHAN") {
      return LiaFileSignatureSolid;
    } else if (statusBill === "XAC_NHAN") {
      return PiShieldCheckFill;
    } else if (statusBill === "VAN_CHUYEN") {
      return FcShipped;
    } else if (statusBill === "DA_THANH_TOAN") {
      return MdPayments;
    } else if (statusBill === "THANH_CONG") {
      return AiFillCarryOut;
    } else if (statusBill === "DA_HUY") {
      return BsFileEarmarkExcelFill;
    }
  };
  const formatDiscountValue = (value) => {
    if (value === undefined || value === null) return "";
    if (value <= 100) {
      return `${value} %`;
    } else {
      // Định dạng theo VND nếu giá trị >= 100
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
      });
      return formatter.format(value);
    }
  };
  useEffect(() => {
    console.log(listBillHistory);
  }, [listBillHistory]);
  useEffect(() => {
    console.log(paymentMethod);
  }, [paymentMethod]);
  useEffect(() => {
    PaymentMethodClientApi.getByBill(id.id).then((res) => {
      setPaymentMethod(res.data.data);

      console.log(res.data.data);
      BillHistoryClientApi.getByIdBill(id.id).then((res1) => {
        const data = res1.data.data;
        if (res.data.data.method === "TIEN_MAT") {
          setListBillHistory(
            data.filter(
              (item) =>
                item.statusBill !== "CHO_VAN_CHUYEN" &&
                item.statusBill !== "DA_THANH_TOAN"
            )
          );
          setStatusPresent(
            data.filter(
              (item) =>
                item.statusBill !== "CHO_VAN_CHUYEN" &&
                item.statusBill !== "DA_THANH_TOAN"
            ).statusBill
          );
        } else {
          setListBillHistory(
            data.filter((item) => item.statusBill !== "CHO_VAN_CHUYEN")
          );
          setStatusPresent(
            data.filter((item) => item.statusBill !== "CHO_VAN_CHUYEN")
              .statusBill
          );
        }
      });
    });
    BillClientApi.getBillById(id.id).then((res) => {
      setBill(res.data.data);
    });
  }, []);
  const formatMoney = (price) => {
    return (
      parseInt(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
    );
  };
  return (
    <React.Fragment>
      <div className="bill-detail-account-header">
        <div
          style={{ cursor: "pointer", color: "gray" }}
          onClick={() => nav("/purchase")}
        >
          {" "}
          <FontAwesomeIcon icon={faChevronLeft} /> Quay lại
        </div>
        <div className="box-code-bill-account">Mã đơn hàng: {bill.code}</div>
      </div>
      <div
        style={{
          borderBottom: "1px solid rgb(224, 224, 224)",
          maxWidth: "890px",
        }}
      >
        <Timeline
          minEvents={statusPresent !== 5 ? 4 : 1}
          style={{
            borderBottom: "1px solid rgb(224, 224, 224)",
          }}
          placeholder
        >
          {listBillHistory.map((item) => (
            <TimelineEvent
              color={getColorByStatus(item.statusBill)}
              i
              style={{ width: "50px", height: "50px", fontSize: "12px" }}
              // color={
              //   item.statusBill !== "DA_HUY" && item.statusBill !== "TRA_HANG"
              //     ? "#0099FF"
              //     : "#FF0000"
              // }
              icon={showIcon(item.statusBill)}
              title={
                item.statusBill === "CHO_XAC_NHAN"
                  ? "Chờ xác nhận"
                  : item.statusBill === "XAC_NHAN"
                  ? paymentMethod.method === "TIEN_MAT"
                    ? "Chờ vận chuyển"
                    : `Đã thanh toán ${formatMoney(bill.totalMoney)}`
                  : item.statusBill === "VAN_CHUYEN"
                  ? "Đang vận chuyển"
                  : item.statusBill === "DA_THANH_TOAN"
                  ? paymentMethod.method === "TIEN_MAT"
                    ? "Đã nhận được hàng"
                    : "Đơn hàng đã đặt"
                  : item.statusBill === "THANH_CONG"
                  ? "Thành công"
                  : "Đã hủy"
              }
              subtitle={dayjs(item.createdDate).format("HH:mm:ss DD-MM-YYYY")}
            />
          ))}
        </Timeline>
      </div>
      <div className="box-address-payment">
        <div className="box-payment-bill-account">
          <h2>Thanh toán</h2>
          <ul>
            <li className="line-payment-bill-account">
              <div className="text-payment-bill-account">Tổng tiền hàng:</div>{" "}
              <div className="value-payment-bill-account">
                {formatMoney(bill.totalMoney)}
              </div>
            </li>
            <li className="line-payment-bill-account">
              <div className="text-payment-bill-account">Phí vận chuyển:</div>{" "}
              <div className="value-payment-bill-account">
                {formatMoney(bill.moneyShip)}
              </div>
            </li>
            <li className="line-payment-bill-account">
              <div className="text-payment-bill-account">Mã giảm giá:</div>{" "}
              <div className="value-payment-bill-account">
                {formatDiscountValue(bill.itemDiscount)}
              </div>
            </li>
            <li className="line-payment-bill-account">
              <div className="text-total-bill-account">Thành tiền:</div>{" "}
              <div className="value-total-bill-account">
                {formatMoney(
                  bill.totalMoney + bill.moneyShip - bill.itemDiscount
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="box-address-bill-account">
          <h2 style={{ marginBottom: 10 }}>Địa chỉ nhận hàng</h2>
          <div style={{ marginBottom: 10 }}>{bill.userName}</div>
          <div className="phone-bill-account">{bill.phoneNumber}</div>
          <div className="phone-bill-account">{bill.address}</div>
        </div>
      </div>
      <div className="payment-method-bill-account">
        {" "}
        <h3 style={{ marginRight: 20 }}>Hình thức thanh toán:</h3>{" "}
        <div>
          {" "}
          {paymentMethod.method === "TIEN_MAT"
            ? "Thanh toán khi nhận hàng"
            : "Chuyển khoản VNpay"}
        </div>{" "}
      </div>
    </React.Fragment>
  );
}

export default BillDetailAccount;
