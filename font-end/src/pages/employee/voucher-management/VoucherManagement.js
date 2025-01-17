import "./style-voucher.css";
import React, { useEffect, useState } from "react";

import {
  Form,
  Input,
  Button,
  Select,
  Table,
  InputNumber,
  DatePicker,
  Row,
  Col,
} from "antd";
import { VoucherApi } from "../../../api/employee/voucher/Voucher.api";
import { GetVoucher, SetVoucher } from "../../../app/reducer/Voucher.reducer";
import CreateVoucherManagement from "./modal/CreateVoucherManagement";
import UpdateVoucherManagement from "./modal/UpdateVoucherManagement";
import DetailVoucherManagement from "./modal/DetailVoucherManagement";
import FilterVoucherManagement from "./modal/FilterVoucherManagement";
import {
  faCircleInfo,
  faEye,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const VoucherManagement = () => {
  const dispatch = useAppDispatch();
  const [list, setList] = useState([]);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [id, setId] = useState("");
  const [formDataSearch, setFormDataSearch] = useState({});

  const data = useAppSelector(GetVoucher);
  useEffect(() => {
    if (data != null) {
      setList(data);
      console.log("List data voucher", data);
    }
  }, [data]);
  useEffect(() => {
    console.log(list);
  }, [list]);

  useEffect(() => {
    loadData();
  }, [formDataSearch]);
  const updatedList = list.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));

  const resetFormSearch = () => {
    setFormDataSearch({});
    loadData();
  };

  // format tiền
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };

  const convertToLongSearch = () => {
    const convertedFormDataSearch = { ...formDataSearch };
    if (formDataSearch.startDate) {
      convertedFormDataSearch.startDate =
        dayjs(formDataSearch.startDate).unix() * 1000;
    }
    if (formDataSearch.endDate) {
      convertedFormDataSearch.endDate =
        dayjs(formDataSearch.endDate).unix() * 1000;
    }
    return convertedFormDataSearch;
  };

  const loadData = () => {
    VoucherApi.fetchAll(convertToLongSearch()).then(
      (res) => {
        setList(res.data.data);
        dispatch(SetVoucher(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleFilter = (formData) => {
    setFormDataSearch(formData);
    setModalFilter(false);
  };

  const handleInputChangeSearch = (name, value) => {
    setFormDataSearch({ ...formDataSearch, [name]: value });
  };

  const openUpdate = (id) => {
    setModalUpdate(true);
    setId(id);
  };
  const openAdd = () => {
    setModalCreate(true);
  };
  const openFilter = () => {
    setModalFilter(true);
  };
  const openDetail = (id) => {
    setModalDetail(true);
    setId(id);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      // sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã khuyến mãi",
      dataIndex: "code",
      key: "code",
      // sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
      key: "name",
      // sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Số lượng tồn",
      dataIndex: "quantity",
      align: "center",
      key: "quantity",
      // sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Giá trị giảm",
      dataIndex: "value",
      align: "center",
      key: "value",
      // sorter: (a, b) => a.value - b.value,
      render: (_, record) => {
        if (record.value > 100) {
          return formatCurrency(record.value);
        } else {
          return `${record.value} %`;
        }
      },
    },
    {
      title: "Đơn tối thiểu",
      dataIndex: "minimumBill",
      align: "center",
      key: "minimumBill",
      // sorter: (a, b) => a.minimumBill - b.minimumBill,
      render: (_, record) => formatCurrency(record.minimumBill),
    },
    {
      title: "Giảm tối đa",
      dataIndex: "maxDiscount",
      align: "center",
      key: "maxDiscount",
      // sorter: (a, b) => a.minimumBill - b.minimumBill,
      render: (_, record) => formatCurrency(record.maxDiscount),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      align: "center",
      key: "startDate",
      // sorter: (a, b) => a.startDate - b.startDate,
      render: (date) => dayjs(date).format("HH:mm:ss  DD-MM-YYYY "),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      align: "center",
      key: "endDate",
      // sorter: (a, b) => a.endDate - b.endDate,
      render: (date) => dayjs(date).format("HH:mm:ss DD-MM-YYYY"),
    },
    // {
    //   title: "Ngày cập nhật",
    //   dataIndex: "lastModifiedDate",
    //   key: "lastModifiedDate",
    //   align: "center",
    //   // sorter: (a, b) => a.lastModifiedDate - b.lastModifiedDate,
    //   render: (date) => dayjs(date).format("HH:mm:ss DD-MM-YYYY"),
    // },
    {
      title: "Trạng Thái",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        const statusClass =
          text === "DANG_SU_DUNG"
            ? "trangthai-sd"
            : text === "KHONG_SU_DUNG"
            ? "trangthai-ksd"
            : "trangthai-ckh";
        return (
          <button className={`gender ${statusClass}`}>
            {text === "DANG_SU_DUNG"
              ? "Đang Kích Hoạt"
              : text === "KHONG_SU_DUNG"
              ? "Không Kích Hoạt"
              : "Chưa kích hoạt"}
          </button>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button
            type="primary"
            title="Chi tiết khuyến mãi"
            style={{ backgroundColor: "#1677ff" }}
            onClick={() => openDetail(record.id)}
          >
            {/* <img
              src={voucherImg}
            /> */}
            <FontAwesomeIcon icon={faEye} />
          </Button>
          {record.status === "DANG_SU_DUNG" ||
          record.status === "CHUA_KICH_HOAT" ? (
            <Button
              type="primary"
              title="Chỉnh sửa khuyến mãi"
              style={{ backgroundColor: "green" }}
              onClick={() => openUpdate(record.id)}
            >
              <FontAwesomeIcon icon={faScrewdriverWrench} />
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  // const { Option } = Select;
  // const fieldsSearch = [
  //   {
  //     name: "code",
  //     type: "text",
  //     label: "Mã khuyễn mãi",
  //     class: "input-search",
  //     placeholder: "Tìm kiếm",
  //   },
  //   {
  //     name: "name",
  //     type: "text",
  //     label: "Tên khuyễn mãi",
  //     class: "input-search",
  //     placeholder: "Tìm kiếm",
  //   },
  //   {
  //     name: "value",
  //     type: "number",
  //     label: "Giá trị giảm",
  //     class: "input-search",
  //     placeholder: "Tìm kiếm",
  //   },
  //   {
  //     name: "quantity",
  //     type: "number",
  //     label: "Số lượng tồn",
  //     class: "input-search",
  //     placeholder: "Tìm kiếm",
  //   },
  //   {
  //     name: "status",
  //     type: "select",
  //     label: "Trạng thái",
  //     options: [
  //       { value: "DANG_SU_DUNG", label: "Còn hạn" },
  //       { value: "KHONG_SU_DUNG", label: "Hết hạn" },
  //     ],
  //     class: "input-search",
  //     placeholder: "Tìm kiếm",
  //   },
  //   // {
  //   //   name: "startDate",
  //   //   type: "date",
  //   //   label: "Từ ngày",
  //   //   class: "input-search",
  //   //   placeholder: "Tìm kiếm",
  //   // },
  //   // {
  //   //   name: "endDate",
  //   //   type: "date",
  //   //   label: "Đến ngày",
  //   //   class: "input-search",
  //   //   placeholder: "Tìm kiếm",
  //   // },
  // ];

  return (
    <div className="promotion">
      <h1 className="title-promotion">Quản lý phiếu giảm giá</h1>

      <Row>
        <span style={{ fontSize: "18px", fontWeight: "500" }}>
          Danh sách phiếu giảm giá
        </span>
      </Row>
      <hr></hr>
      <div className="manager-promotion">
        <Button
          title="Thêm phiếu giảm giá"
          onClick={openAdd}
          className="button-add"
        >
          + Thêm
        </Button>

        <Button
          title="Lọc phiếu giảm giá"
          onClick={openFilter}
          className="button-add"
        >
          Filter
        </Button>

        <Button
          title="Làm mới mục tìm kiếm"
          className="button-add"
          onClick={resetFormSearch}
        >
          Làm mới
        </Button>

        <div className="promotion-table">
          <Table
            dataSource={updatedList}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
          />
        </div>
      </div>

      {/* modal */}
      <CreateVoucherManagement
        modalCreate={modalCreate}
        setModalCreate={setModalCreate}
      />
      <UpdateVoucherManagement
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        id={id}
      />
      <DetailVoucherManagement
        modalDetail={modalDetail}
        setModalDetail={setModalDetail}
        id={id}
      />
      <FilterVoucherManagement
        modalFilter={modalFilter}
        setModalFilter={setModalFilter}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default VoucherManagement;
