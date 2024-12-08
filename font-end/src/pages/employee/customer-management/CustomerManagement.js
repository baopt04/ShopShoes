import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  Table,
  Slider,
  Row,
  Col,
  Modal,
  Tooltip,
  Radio,
} from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./style-customer.css";
import { CustomerApi } from "../../../api/employee/account/customer.api";
import { AddressApi } from "../../../api/customer/address/address.api";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { Link } from "react-router-dom";
import {
  GetCustomer,
  SetCustomer,
} from "../../../app/reducer/Customer.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faEdit,
  faEye,
  faFilter,
  faKaaba,
  faListAlt,
  faPlus,
  faMap,
  faCircleInfo,
  faScrewdriverWrench,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import ModalCreateAddress from "./modal/ModalCreateAddress";
import ModalUpdateAddress from "./modal/ModalUpdateAddress";
const { Option } = Select;

const CustomerManagement = () => {
  const [initialCustomerList, setInitialCustomerList] = useState([]);
  const [listaccount, setListaccount] = useState([]);
  const [initialStartDate, setInitialStartDate] = useState(null);
  const [initialEndDate, setInitialEndDate] = useState(null);
  const dispatch = useAppDispatch();
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [searchCustomer, setSearchCustomer] = useState({
    keyword: "",
    status: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [clickRadio, setClickRadio] = useState("");

  const changeRadio = (index) => {
    setClickRadio(index);
  };
  // Lấy mảng redux ra
  const data = useAppSelector(GetCustomer);
  useEffect(() => {
    if (data != null) {
      setListaccount(data);
    }
  }, [data]);

  // Search customer
  const handleInputChangeSearch = (name, value) => {
    setSearchCustomer((prevSearchCustomer) => ({
      ...prevSearchCustomer,
      [name]: value,
    }));
  };

  const handleKeywordChange = (event) => {
    const { value } = event.target;
    handleInputChangeSearch("keyword", value);
  };

  const handleStatusChange = (value) => {
    handleInputChangeSearch("status", value);
  };
  const handleAgeRangeChange = (value) => {
    setAgeRange(value);
  };
  useEffect(() => {
    const { keyword, status } = searchCustomer;

    CustomerApi.fetchAll({ status }).then((res) => {
      const filteredCustomers = res.data.data
        .filter((customer) => {
          const fullName = customer.fullName || "";
          const phoneNumber = customer.phoneNumber || "";
          const toKeyword = keyword.toLowerCase();

          return (
            fullName.toLowerCase().includes(toKeyword) ||
            phoneNumber.includes(keyword)
          );
        })
        .map((customer, index) => ({
          ...customer,
          stt: index + 1,
        }));

      setListaccount(filteredCustomers);
      dispatch(SetCustomer(filteredCustomers));
    });
  }, [searchCustomer.status]);

  const handleSubmitSearch = (value) => {
    const { keyword, status } = searchCustomer;

    CustomerApi.fetchAll({ status }).then((res) => {
      const filteredCustomers = res.data.data
        .filter((customer) => {
          const toKeyword = keyword.toLowerCase();
          const fullName = customer.fullName
            ? customer.fullName.toLowerCase()
            : "";
          const phoneNumber = customer.phoneNumber ? customer.phoneNumber : "";
          return fullName.includes(toKeyword) || phoneNumber.includes(keyword);
        })
        .map((customer, index) => ({
          ...customer,
          stt: index + 1,
        }));

      setListaccount(filteredCustomers);
      dispatch(SetCustomer(filteredCustomers));
    });
  };

  // Lọc danh sách theo khoảng ngày sinh
  const filterByDateOfBirthRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      setListaccount(initialCustomerList);
      dispatch(SetCustomer(initialCustomerList));
      return;
    }

    const filteredCustomers = initialCustomerList.filter((customer) => {
      const accountDateOfBirth = moment(customer.dateOfBirth).startOf("day");
      const start = moment(startDate).startOf("day");
      const end = moment(endDate).endOf("day");
      return accountDateOfBirth.isBetween(start, end, null, "[]");
    });

    setListaccount(filteredCustomers);
    dispatch(SetCustomer(filteredCustomers));
  };
  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    setStartDate(startDate);
    filterByDateOfBirthRange(startDate, endDate);
  };

  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    setEndDate(endDate);
    filterByDateOfBirthRange(startDate, endDate);
  };

  const handleClear = () => {
    setSearchCustomer({
      keyword: "",
      status: "",
    });
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setListaccount(
      initialCustomerList.map((customer, index) => ({
        ...customer,
        stt: index + 1,
      }))
    );
    setAgeRange([0, 100]);
  };
  const filterByAgeRange = (minAge, maxAge) => {
    if (minAge === 0 && maxAge === 100) {
      setListaccount(initialCustomerList);
      dispatch(SetCustomer(initialCustomerList));
    } else {
      const filteredAccounts = initialCustomerList.filter((customer) => {
        const age = moment().diff(customer.dateOfBirth, "years");
        return age >= minAge && age <= maxAge;
      });

      setListaccount(filteredAccounts);
      dispatch(SetCustomer(filteredAccounts));
    }
  };
  const loadData = () => {
    CustomerApi.fetchAll().then(
      (res) => {
        const accounts = res.data.data.map((customer, index) => ({
          ...customer,
          stt: index + 1,
        }));
        setListaccount(res.data.data);
        setInitialCustomerList(accounts);
        setInitialStartDate(null);
        setInitialEndDate(null);
        dispatch(SetCustomer(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // Xử lý logic chỉnh sửa
  const [idUpdate, setIdUpdate] = useState("");
  const [idDetail, setIdDetail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleAddAddress, setModalVisibleAddAddress] = useState(false);
  const [modalVisibleUpdateAddress, setModalVisibleUpdateAddress] =
    useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [modalVisibleDetail, setModalVisibleDetail] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [customerId, setCustomerId] = useState("");

  const handleViewUpdate = (id) => {
    setAddressId(id);
    setModalVisibleUpdateAddress(true);
    setIsModalAddressOpen(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setModalVisibleAddAddress(false);
    setModalVisibleUpdateAddress(false);
    setModalVisibleUpdate(false);
    setModalVisibleDetail(false);
  };

  const handleViewDetail = (id) => {
    setIdDetail(id);
    setModalVisibleDetail(true);
  };

  const handleUpdate = (id) => {
    setIdUpdate(id);
    setModalVisibleUpdate(true);
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    filterByAgeRange(ageRange[0], ageRange[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ageRange, initialCustomerList]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      // sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ảnh",
      dataIndex: "avata",
      key: "avata",
      render: (avata) => (
        <img
          src={
            avata == null
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtp7SBv7iqt9a63k7ghTSJBMPKZF03MpmhDg&usqp=CAU"
              : avata
          }
          alt="Hình ảnh"
          style={{ width: "80px", height: "80px", borderRadius: "10px" }}
        />
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      // sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    // {
    //   title: "CCCD",
    //   dataIndex: "citizenIdentity",
    //   key: "citizenIdentity",
    //   sorter: (a, b) => a.citizenIdentity.localeCompare(b.citizenIdentity),
    // },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      // sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      // sorter: (a, b) => a.dateOfBirth - b.dateOfBirth,
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    // {
    //   title: "Điểm",
    //   dataIndex: "points",
    //   key: "points",
    //   sorter: (a, b) => a.points.localeCompare(b.points),
    // },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const genderClass =
          text === "DANG_SU_DUNG" ? "trangthai-sd" : "trangthai-ksd";
        const statusStyle = {
          backgroundColor: text === "DANG_SU_DUNG" ? "#4CAF50" : "#FF0000",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        };
        return (
          <button className={`gender ${genderClass}`} style={statusStyle}>
            {text === "DANG_SU_DUNG" ? "Kích hoạt " : "Ngừng kích hoạt"}
          </button>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/detail-customer-management/${record.id}`}>
            <Button
              type="primary"
              title="Chi tiết khách hàng"
              style={{ backgroundColor: "#1677ff" }}
              onClick={() => handleViewDetail(record.id)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Link>
          <Link to={`/update-customer-management/${record.id}`}>
            <Button
              type="primary"
              title="Chỉnh sửa khách hàng"
              style={{ backgroundColor: "green", borderColor: "green" }}
              onClick={() => handleUpdate(record.id)}
            >
              <FontAwesomeIcon icon={faScrewdriverWrench} />
            </Button>
          </Link>

          <Button
            type="primary"
            title="Địa chỉ khách hàng"
            style={{ backgroundColor: "black", borderColor: "black" }}
            onClick={() => selectedAccount(record)}
          >
            <FontAwesomeIcon icon={faLocation} />
          </Button>
        </div>
      ),
    },
  ];

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };
  const columnsAddress = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phonenumber",
      key: "phonenumber",
      sorter: (a, b) => a.phonenumber.localeCompare(b.phonenumber),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },

    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const genderClass = text === "DANG_SU_DUNG" ? "trangthai-sd" : "";
        return (
          <button className={`gender ${genderClass}`}>
            {text === "DANG_SU_DUNG" ? "Mặc định " : ""}
          </button>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="dashed"
            title="Chọn"
            style={{
              color: "#02bdf0",
              border: "1px solid #02bdf0",
              fontWeight: "500",
            }}
            onClick={() => handleViewUpdate(record.id)}
          >
            Cập nhật
          </Button>
        </div>
      ),
    },
  ];
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);

  const showModalAddress = (e) => {
    setIsModalAddressOpen(true);
  };
  const handleOkAddress = () => {
    setIsModalAddressOpen(false);
  };
  const handleCancelAddress = () => {
    setIsModalAddressOpen(false);
  };
  const handleOpenAddAdress = () => {
    setIsModalAddressOpen(false);
    setModalVisibleAddAddress(true);
  };
  const [listAddress, setListAddress] = useState([]);

  const selectedAccount = (record) => {
    setIsModalAddressOpen(true);
    setCustomerId(record.id);
    AddressApi.fetchAllAddressByUser(record.id).then((res) => {
      setListAddress(res.data.data);
    });
  };

  return (
    <>
      <div className="title_account">
        {/* <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} /> */}
        <span style={{ marginLeft: "40%" }}>Quản lý khách hàng</span>
      </div>
      <div className="filter">
        {/* <FontAwesomeIcon icon={faFilter} size="2x" /> */}
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        {/* <hr /> */}
        <div className="content_ac">
          <div className="content-wrapper-ac"></div>
          <Row justify="space-between" style={{ marginLeft: "50px" }}>
            <Col span={10} style={{ marginBottom: "10px" }}>
              <label style={{ marginBottom: "20px" }}>Tìm kiếm:</label>
              <Input
                style={{
                  width: "300px",
                  marginLeft: "19px",
                  marginBottom: "20px",
                }}
                placeholder="Tìm kiếm tên và sđt..."
                type="text"
                name="keyword"
                value={searchCustomer.keyword}
                onChange={handleKeywordChange}
              />
            </Col>

            <Col span={10}>
              <label>Trạng thái:</label>
              <Select
                style={{ width: "300px", marginLeft: "15px" }}
                name="status"
                value={searchCustomer.status}
                onChange={handleStatusChange}
              >
                <Option value="">Tất cả</Option>
                <Option value="DANG_SU_DUNG">Kích hoạt</Option>
                <Option value="KHONG_SU_DUNG">Ngừng kích hoạt</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div>
          <div className="box_btn_filter">
            <Button
              className="btn_filter"
              type="submit"
              onClick={handleSubmitSearch}
            >
              Tìm kiếm
            </Button>
            <Button className="btn_clear" onClick={handleClear}>
              Làm mới
            </Button>
          </div>
        </div>
      </div>
      <div className="account-table">
        <div
          className="title_account"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* <FontAwesomeIcon
            icon={faListAlt}
            style={{ fontSize: "26px", marginRight: "10px" }}
          /> */}
          <span style={{ fontSize: "18px", fontWeight: "500" }}>
            Danh sách khách hàng
          </span>
          <div style={{ marginLeft: "auto" }}>
            <Link to="/create-customer-management">
              <Tooltip title="Thêm khách hàng">
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() => setModalVisible(true)}
                >
                  Thêm
                </Button>
              </Tooltip>
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Table
            dataSource={listaccount}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 5 }}
            className="account-table"
            rowClassName={getRowClassName}
          />
        </div>
      </div>

      <ModalCreateAddress
        visible={modalVisibleAddAddress}
        onCancel={handleCancel}
        id={customerId}
      />
      <ModalUpdateAddress
        visible={modalVisibleUpdateAddress}
        onCancel={handleCancel}
        id={addressId}
      />
      {/* begin modal Address */}
      <Modal
        title="Địa chỉ"
        open={isModalAddressOpen}
        onOk={handleOkAddress}
        onCancel={handleCancelAddress}
        style={{ backgroundColor: "#f0f2f5" }} // Thêm màu nền Modal
        height={400}
      >
        <Row style={{ width: "100%" }}>
          <Col span={16}></Col>
          <Col span={1}>
            <Button onClick={() => handleOpenAddAdress()}>
              + Thêm địa chỉ mới
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}></Row>
        <div style={{ overflowY: "auto", height: "450px" }}>
          {listAddress.map((item, index) => (
            <div
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                borderTop: "1px solid grey",
                padding: "10px 0",
                borderRadius: "3px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <Row style={{ marginTop: "10px" }}>
                <Col span={2}>
                  <Radio
                    name="group-radio"
                    value={item}
                    checked={
                      !clickRadio
                        ? item.status === "DANG_SU_DUNG"
                        : index === clickRadio
                    }
                    onChange={() => changeRadio(index)}
                  />
                </Col>
                <Col span={17}>
                  <Row>
                    {item.status === "DANG_SU_DUNG" ? (
                      <Row>
                        <div style={{ marginRight: "5px" }}>
                          <FontAwesomeIcon
                            icon={faHouse}
                            style={{ color: "#1890ff" }}
                          />
                        </div>
                      </Row>
                    ) : null}
                    <span
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        marginRight: 3,
                        color: "#333",
                      }}
                    >
                      {item.fullName}
                    </span>
                    {"  |  "}
                    <span
                      style={{ marginTop: "2px", marginLeft: 3, color: "#666" }}
                    >
                      {item.phoneNumber}
                    </span>
                  </Row>
                  <Row>
                    <span style={{ fontSize: 14, color: "#999" }}>
                      {item.address}
                    </span>
                  </Row>
                </Col>
                <Col span={4}>
                  <Button
                    type="dashed"
                    title="Chọn"
                    style={{
                      fontWeight: "470",
                      border: "solid 1px black",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e6f7ff")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "")
                    }
                    onClick={() => handleViewUpdate(item.id)}
                  >
                    {" "}
                    Cập nhật
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
export default CustomerManagement;
