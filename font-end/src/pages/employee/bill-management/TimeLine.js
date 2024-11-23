import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import moment from "moment";
import React from "react";
import { AiFillCarryOut, AiFillFileText } from "react-icons/ai";
import { FaCarSide } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import {
  BsFileEarmarkExcelFill,
  BsFillFileEarmarkCheckFill,
} from "react-icons/bs";
import { PiShieldCheckFill } from "react-icons/pi";
import { LiaFileSignatureSolid, LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { MdPayments } from "react-icons/md";
import "./timeline.css";

function TimeLine({ listStatus, data, statusPresent }) {
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
    if (statusBill === "TAO_HOA_DON") {
      return AiFillFileText;
    } else if (statusBill === "CHO_XAC_NHAN") {
      return LiaFileSignatureSolid;
    } else if (statusBill === "XAC_NHAN") {
      return PiShieldCheckFill;
    } else if (statusBill === "VAN_CHUYEN") {
      return FcShipped;
    } else if (statusBill === "CHO_VAN_CHUYEN") {
      return LiaShippingFastSolid;
    } else if (statusBill === "DA_THANH_TOAN") {
      return MdPayments;
    } else if (statusBill === "THANH_CONG") {
      return AiFillCarryOut;
    } else if (statusBill === "TRA_HANG") {
      return GiReturnArrow;
    } else {
      return BsFileEarmarkExcelFill;
    }
  };
  return (
    <div className="container" style={{ width: "100%", margin: "10px" }}>
      <Timeline minEvents={statusPresent != 7 ? 5 : 1} placeholder>
        {data
          .filter((history) => history.statusBill !== null)
          .map((item) => (
            <TimelineEvent
              color={getColorByStatus(item.statusBill)}
              icon={showIcon(item.statusBill)}
              title={
                item.statusBill === "TAO_HOA_DON"
                  ? "Hóa đơn chờ "
                  : item.statusBill === "CHO_XAC_NHAN"
                  ? "Chờ xác nhận"
                  : item.statusBill === "XAC_NHAN"
                  ? "Đã xác nhận"
                  : item.statusBill === "CHO_VAN_CHUYEN"
                  ? "Chờ vận chuyển"
                  : item.statusBill === "VAN_CHUYEN"
                  ? "Đang vận chuyển"
                  : item.statusBill === "DA_THANH_TOAN"
                  ? "Đã thanh toán"
                  : item.statusBill === "TRA_HANG"
                  ? "Trả hàng"
                  : item.statusBill === "THANH_CONG"
                  ? "Thành công"
                  : "Đã hủy"
              }
              subtitle={moment(item.createDate).format(" HH:mm:ss DD-MM-YYYY ")}
            />
          ))}
      </Timeline>
    </div>
  );
}

export default TimeLine;
