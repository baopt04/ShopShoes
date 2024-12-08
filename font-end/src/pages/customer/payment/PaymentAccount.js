/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  faCarRear,
  faCoins,
  faStore,
  faLocationDot,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Checkbox, Col, Modal, Radio, Row } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import utc from "dayjs/plugin/utc";
import { parseInt } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoVnPay from "../../../../src/assets/images/logo_vnpay.png";
import { CartClientApi } from "../../../api/customer/cart/cartClient.api";
import { PaymentClientApi } from "../../../api/customer/payment/paymentClient.api";
import ModalCreateAddress from "../../customer/payment/modal/ModalCreateAddress";
import ModalUpdateAddress from "../../customer/payment/modal/ModalUpdateAddress";
import { useCart } from "../cart/CartContext";
import { AddressClientApi } from "./../../../api/customer/address/addressClient.api";
import { BillClientApi } from "./../../../api/customer/bill/billClient.api";
import ModalCreateAddressAccount from "./modal/ModalCreateAddressAccount";
import "./style-payment-account.css";
import { AccountPoinApi } from "../../../api/customer/poin/accountpoin.api";
import { UserPoinApi } from "../../../api/customer/user/user.api";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

dayjs.extend(utc);
function PaymentAccount() {
  const nav = useNavigate();
  const [modalAddressAccount, setModalAddressAccount] = useState(false);
  const { updateTotalQuantity } = useCart();
  const idAccount = sessionStorage.getItem("idAccount");
  const [addressDefault, setAddressDefault] = useState({});
  const [formBill, setFormBill] = useState({
    address: "",
    billDetail: [],
    itemDiscount: 0,
    paymentMethod: "paymentReceive",
    phoneNumber: "",
    totalMoney: 0,
    userName: "",
    idVoucher: "",
    afterPrice: 0,
  });
  const [moneyShip, setMoneyShip] = useState(1);
  const [dayShip, setDayShip] = useState("");
  const [keyMethodPayment, setKeyMethodPayment] = useState("paymentReceive");
  const listproductOfBill = JSON.parse(sessionStorage.getItem("bill"));
  const voucher = JSON.parse(sessionStorage.getItem("voucher"));
  const comercial = [
    { title: "CHÀO MỪNG QUÝ KHÁCH!" },
    { title: " CHÚC QUÝ KHÁCH MUA HÀNG HAPPY!" },
    { title: " FREE SHIPPING VỚI HÓA ĐƠN TRÊN 2 triệu!" },
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [totalAfter, setTotalAfter] = useState(0);
  const [total, setTotal] = useState({});
  const [totalBefore, setTotalBefore] = useState(0);
  const [userId, setUserId] = useState("");
  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = Stomp.over(socket);
  const [dataPoin, setDataPoin] = useState(null);
  const [account, setAccount] = useState(null);
  const [exchangeRateMoney, setExchangeRateMoney] = useState(0);
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
  // const onChange = (e) => {
  //   if (e.target.checked) {
  //     setExchangeRateMoney(dataPoin.exchangeRateMoney * account?.points);
  //   } else {
  //     setExchangeRateMoney(0);
  //   }
  // };
  useEffect(() => {
    getAddressDefault(idAccount);
    moneyBefore();
    AccountPoinApi.findPoin()
      .then((res) => {
        setDataPoin(res.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    UserPoinApi.findUser()
      .then((res) => {
        setAccount(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % comercial.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function tinhSoDiemCanThanhToan() {
    var tongTienGiamVoucher =
      voucher?.discountPrice !== undefined && !isNaN(voucher?.discountPrice)
        ? voucher.discountPrice
        : 0;
    var tongTienGiam = tongTienGiamVoucher + exchangeRateMoney;
    var tongTienThanhToan =
      formBill.billDetail.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0) + moneyShip;
    if (tongTienGiam > tongTienThanhToan) {
      var soDiemCanThanhToan = Math.floor(
        (tongTienThanhToan - voucher.discountPrice) / dataPoin.exchangeRateMoney
      );
      return soDiemCanThanhToan;
    } else {
      return account?.points;
    }
  }

  useEffect(() => {
    console.log(formBill);
  }, [formBill]);
  useEffect(() => {
    setTotalBefore(total.totalMoney);
  }, [total]);
  useEffect(() => {
    formBillChange("afterPrice", totalAfter);
  }, [totalAfter]);

  useEffect(() => {
    console.log("money ship", moneyShip);
    console.log("voucher", voucher.value);
    console.log("tổng", totalBefore + moneyShip - voucher.value);
    let voucherValue = 0;
    if (voucher.value < 100) {
      voucherValue = (totalBefore * voucher.value) / 100;
    } else {
      voucherValue = voucher.value;
    }
    console.log("tổng", totalBefore + moneyShip - voucherValue);
    setTotalAfter(totalBefore + moneyShip - voucherValue);
    formBillChange("moneyShip", moneyShip);
  }, [moneyShip, voucher.value, totalBefore]);

  useEffect(() => {
    if (exchangeRateMoney != 0) {
      setTotalAfter(totalAfter - exchangeRateMoney);
    } else if (exchangeRateMoney == 0 && dataPoin != null && account != null) {
      setTotalAfter(totalAfter + dataPoin.exchangeRateMoney * account?.points);
    }
  }, [exchangeRateMoney]);

  useEffect(() => {
    if (addressDefault !== null) {
      getMoneyShip(addressDefault.districtId, addressDefault.wardCode);
      getDayShip(addressDefault.districtId, addressDefault.wardCode);
      const updatedListproductOfBill = listproductOfBill.map((item) => {
        const { nameProduct, nameSize, image, ...rest } = item;
        return rest;
      });
      setFormBill((prevFormBill) => ({
        ...prevFormBill,
        address:
          addressDefault.line +
          ", " +
          addressDefault.ward +
          ", " +
          addressDefault.district +
          ", " +
          addressDefault.province,
        phoneNumber: addressDefault.phoneNumber,
        userName: addressDefault.fullName,
        idVoucher: voucher.idVoucher,
        itemDiscount: voucher.value,
        billDetail: updatedListproductOfBill,
        idAccount: idAccount,
      }));

      setUserId(addressDefault.userId);
    }
  }, [addressDefault]);

  useEffect(() => {
    console.log(keyMethodPayment);
  }, [keyMethodPayment]);

  const openModalCreateAddress = () => {
    setModalAddressAccount(true);
  };
  const getAddressDefault = (id) => {
    console.log(id);
    AddressClientApi.getByAccountAndStatus(id).then(
      (res) => {
        setAddressDefault(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const payment = () => {
    console.log(tinhSoDiemCanThanhToan() < account?.points);
    console.log(account?.points);
    Modal.confirm({
      title: "Xác nhận đặt hàng",
      content: "Bạn có chắc chắn muốn đặt hàng ?",
      okText: "Đặt hàng",
      okType: "primary",
      cancelText: "Hủy",
      onOk() {
        var dataBill = formBill;

        dataBill.itemDiscount += exchangeRateMoney;
        var poin = 0;
        if (exchangeRateMoney > 0) {
          poin = tinhSoDiemCanThanhToan();
        }

        if (poin > 0 && poin < account?.points) {
          dataBill.itemDiscount = totalBefore + moneyShip;
        }
        dataBill.poin = poin;
        dataBill.totalMoney = totalBefore;
        if (addressDefault === null) {
          toast.error("Bạn chưa có địa chỉ nhận hàng, vui lòng thêm!");
          return;
        }

        const dataBillSave = {
          ...dataBill,
          shippingTime: dayShip,
        };

        if (formBill.paymentMethod === "paymentVnpay") {
          const data = {
            vnp_Ammount: totalAfter,
            billDetail: formBill.billDetail,
          };
          console.log(listproductOfBill);
          PaymentClientApi.paymentVnpay(data).then(
            (res) => {
              window.location.replace(res.data.data);
              sessionStorage.setItem("formBill", JSON.stringify(dataBillSave));
            },
            (err) => {
              console.error(err);
            }
          );
        } else if (formBill.paymentMethod === "paymentReceive") {
          BillClientApi.createBillAccountOnline(dataBillSave).then(
            (res) => {
              CartClientApi.quantityInCart(idAccount).then(
                (res) => {
                  updateTotalQuantity(res.data.data);
                  stompClient.send(
                    "/action/notifyAdmin",
                    {},
                    "Có đơn hàng mới"
                  );
                },
                (err) => {
                  console.error(err);
                }
              );
              toast.success("Bạn đặt hàng thành công.");
              nav("/home");
            },
            (err) => {
              console.error(err);
            }
          );
        } else if (formBill.paymentMethod === "paymentAtStore") {
          BillClientApi.createBillAccountOnline(dataBillSave).then(
            (res) => {
              CartClientApi.quantityInCart(idAccount).then(
                (res) => {
                  const newCartItems = res.data.data.map((item) => {
                    const productInBill = dataBillSave.billDetail.find(
                      (billItem) => billItem.idProduct === item.id
                    );
                    if (productInBill) {
                      return {
                        ...item,
                        quantity: item.quantity - productInBill.quantity,
                      };
                    } else {
                      return item;
                    }
                  });

                  stompClient.send(
                    "/action/notifyAdmin",
                    {},
                    "Có đơn hàng mới"
                  );
                  toast.success("Bạn đặt hàng thành công.");
                  nav("/home");
                },
                (err) => {
                  console.error(err);
                }
              );
            },
            (err) => {
              console.error(err);
              toast.error("Đã xảy ra lỗi trong quá trình đặt hàng.");
            }
          );
        }
      },
    });
  };

  const getMoneyShip = (districtId, wardCode) => {
    console.log(totalBefore - voucher.value);
    if (totalBefore - voucher.value >= 5000000) {
      setMoneyShip(0);
    } else {
      AddressClientApi.getMoneyShip(districtId, wardCode).then(
        (res) => {
          setMoneyShip(res.data.data.total);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  const getDayShip = (districtId, wardCode) => {
    AddressClientApi.getDayShip(districtId, wardCode).then(
      (res) => {
        const leadtimeInSeconds = res.data.data.leadtime;
        const formattedDate = moment
          .unix(leadtimeInSeconds)
          .format("DD/MM/YYYY");
        setDayShip(formattedDate);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const formatMoney = (price) => {
    return (
      parseInt(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
    );
  };
  const formBillChange = (name, value) => {
    setFormBill((prevFormBill) => ({
      ...prevFormBill,
      [name]: value,
    }));
  };

  const paymentReceive = () => {
    setKeyMethodPayment("paymentReceive");
    setFormBill({ ...formBill, paymentMethod: "paymentReceive" });
  };
  const paymentVnpay = () => {
    setKeyMethodPayment("paymentVnpay");
    setFormBill({ ...formBill, paymentMethod: "paymentVnpay" });
  };

  const paymentAtStore = () => {
    setKeyMethodPayment("paymentAtStore");
    setFormBill({
      ...formBill,
      paymentMethod: "paymentReceive",
      address: "123 Đường ABC, TP. Hồ Chí Minh",
      moneyShip: 0,
    });
  };

  const moneyBefore = () => {
    const money = listproductOfBill.reduce(
      (total, item) =>
        total +
        parseInt(
          (parseInt(item.price) -
            parseInt(item.price) * (item.valuePromotion / 100)) *
            item.quantity
        ),
      0
    );

    formBillChange(
      "totalMoney",
      listproductOfBill.reduce(
        (total, item) => total + parseInt(item.price) * item.quantity,
        0
      )
    );
    const quantity = listproductOfBill.reduce(
      (total, item) => total + parseInt(item.quantity),
      0
    );
    console.log(quantity);
    setTotal((prev) => ({
      ...prev,
      totalMoney: money,
      totalQuantity: quantity,
    }));
  };

  const [clickRadio, setClickRadio] = useState("");
  const changeRadio = (index, item) => {
    setClickRadio(index);
    setAddressDefault(item);
  };
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [modalVisibleAddAddress, setModalVisibleAddAddress] = useState(false);
  const [modalVisibleUpdateAddress, setModalVisibleUpdateAddress] =
    useState(false);
  const [addressId, setAddressId] = useState("");

  const handleViewUpdate = (id) => {
    setAddressId(id);
    setModalVisibleUpdateAddress(true);
    setIsModalAddressOpen(false);
  };

  const handleCancel = () => {
    setModalVisibleAddAddress(false);
    setModalVisibleUpdateAddress(false);
    getAddressDefault(idAccount);
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

  const handleChangeAddress = () => {
    setIsModalAddressOpen(true);
    AddressClientApi.fetchAllAddressByUser(userId).then((res) => {
      setListAddress(res.data.data);
    });
  };

  return (
    <div className="payment-acc">
      <Row>
        <Col
          lg={{ span: 11, offset: 2 }}
          style={{}}
          className="left-payment-acc"
        >
          <div className="border-top-address"></div>
          <div className="address-payment">
            {addressDefault !== null ? (
              <>
                <div className="title-address-recieve-good">
                  <span className="icon-address-payment-acc">
                    <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ nhận hàng
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>
                    {addressDefault.fullName}
                  </span>
                  {" | "}
                  <span>
                    {addressDefault.phoneNumber}
                    <br></br>
                  </span>
                  <span style={{ fontSize: 15, marginLeft: 0, width: "200px" }}>
                    {addressDefault.line}, {addressDefault.ward},{" "}
                    {addressDefault.district}, {addressDefault.province}
                  </span>
                  {addressDefault.status === "DANG_SU_DUNG" ? (
                    <span className="status-default">Mặc định</span>
                  ) : (
                    ""
                  )}
                  <span
                    className="change-address-payment"
                    onClick={handleChangeAddress}
                  >
                    Thay đổi
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="title-address-recieve-good">
                  <span className="icon-address-payment-acc">
                    <FontAwesomeIcon icon={faLocationDot} /> Thông tin giao hàng
                  </span>
                </div>
                <div>
                  <span>Bạn chưa có địa chỉ nào!</span>
                  <span
                    className="change-address-payment"
                    onClick={openModalCreateAddress}
                  >
                    Thêm mới địa chỉ
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="voucher-payment-acc">
            <Row style={{ display: "flex" }}>
              <span style={{ fontSize: 20 }}>
                <FontAwesomeIcon
                  style={{ color: "#1677ff", marginRight: 10 }}
                  icon={faTags}
                />{" "}
                Shoes voucher
              </span>
              <span className="money-reduce-payment-acc">
                {formatDiscountValue(voucher.value)}
              </span>
            </Row>
          </div>
          <div className="footer-payment-acc">
            <div className="method-payment-acc">
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                Phương thức thanh toán
              </div>
              {/*  */}
              <div className="select-payment-acc">
                <div
                  className={`payment-when-recevie-acc ${
                    keyMethodPayment === "paymentReceive" ? "click" : ""
                  }`}
                  onClick={paymentReceive}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>
                      <input
                        style={{ marginLeft: "10px" }}
                        type="radio"
                        name="paymentMethod"
                        value="paymentReceive"
                        checked={keyMethodPayment === "paymentReceive"}
                        onChange={() => setKeyMethodPayment("paymentReceive")}
                      />
                    </label>
                    <img
                      style={{ width: "30px", marginLeft: "10px" }}
                      src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6"
                      alt="..."
                    />{" "}
                    <span style={{ marginLeft: "10px" }}>
                      Thanh Toán Khi Nhận Hàng
                    </span>
                  </div>
                </div>

                {/*  */}

                <div
                  className={`payment-at-the-store ${
                    keyMethodPayment === "paymentAtStore" ? "click" : ""
                  }`}
                  onClick={paymentAtStore}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>
                      <input
                        style={{ marginLeft: "10px" }}
                        type="radio"
                        name="paymentMethod"
                        value="paymentAtStore"
                        checked={keyMethodPayment === "paymentAtStore"}
                        onChange={() => setKeyMethodPayment("paymentAtStore")}
                      />
                    </label>
                    <Row>
                      <Col>
                        <span style={{ marginLeft: "10px" }}>
                          <FontAwesomeIcon icon={faStore} />
                          Nhận Tại Cửa Hàng
                        </span>
                      </Col>
                      <Col>
                        <span
                          style={{ color: "black" }}
                          className="payment-at-the-store-address"
                        >
                          123 Đường ABC, TP. Hồ Chí Minh
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div
                  className={`payment-by-vnpay-acc ${
                    keyMethodPayment === "paymentVnpay" ? "click" : ""
                  }`}
                  onClick={paymentVnpay}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>
                      <input
                        style={{ marginLeft: "10px" }}
                        type="radio"
                        name="paymentMethod"
                        value="paymentVnpay"
                        checked={keyMethodPayment === "paymentVnpay"}
                        onChange={() => setKeyMethodPayment("paymentVnpay")}
                      />
                    </label>
                    <img
                      style={{ width: "30px", marginLeft: "10px" }}
                      src={logoVnPay}
                      alt="..."
                    />{" "}
                    <span style={{ marginLeft: "10px" }}>Thanh Toán VnPay</span>
                  </div>
                </div>
              </div>

              {/*  */}
            </div>

            <div className="titles-money-payment-acc">
              <Row>
                <Col span={12}>
                  <h3>Tổng tiền</h3>
                </Col>
                <Col span={12}>
                  <h3> {formatMoney(totalBefore)}</h3>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={12}>
                  <h3>Mã giảm giá </h3>
                </Col>
                <Col span={12}>
                  <h3> {formatDiscountValue(voucher.value)}</h3>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={12}>
                  <h3>Phí vận chuyển</h3>
                </Col>
                <Col span={12}>
                  <h3> {formatMoney(moneyShip)}</h3>
                </Col>
              </Row>
              <br />

              <Row>
                <Col span={12}>
                  <h3>Tổng thanh toán</h3>
                </Col>
                <Col span={12}>
                  <h3 className="text-money-total">
                    {formatMoney(Math.max(0, totalAfter))}{" "}
                  </h3>
                </Col>
              </Row>
              <div className="form-submit-payment-acc">
                <div className="button-submit-buy-acc" onClick={payment}>
                  Đặt hàng
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={{ span: 9 }} id="payment-sp" className="right-payment-acc">
          <div className="product-of-bill-acc">
            <div className="title-product-of-bill-acc">
              <div style={{ fontSize: 15, width: "50%" }}>Sản phẩm</div>
              <div style={{ width: "30%" }}>Đơn giá</div>
              <div style={{ width: "25%" }}>Thành tiền</div>
            </div>

            <div className="content-product-of-bill-acc">
              {listproductOfBill.map((item, index) => (
                <div className="item-product-bill-acc" key={index}>
                  <div className="product-info">
                    <Badge
                      size="default"
                      count={item.quantity}
                      style={{
                        backgroundColor: "#ff4400",
                        fontSize: "10px",
                        height: "20px",
                        width: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        className="img-product-bill-acc"
                        src={item.image.split(",")[0]}
                        alt="product"
                      />
                    </Badge>
                    <span className="product-name">{item.nameProduct}</span>
                  </div>
                  <span className="product-price">
                    {item.valuePromotion !== null
                      ? formatMoney(
                          item.price - item.price * (item.valuePromotion / 100)
                        )
                      : formatMoney(item.price)}
                  </span>
                  <span className="total-price">
                    {item.valuePromotion === null
                      ? formatMoney(item.quantity * item.price)
                      : formatMoney(
                          item.quantity *
                            (parseInt(item.price) -
                              parseInt(item.price) *
                                (item.valuePromotion / 100))
                        )}
                  </span>
                </div>
              ))}
            </div>

            <div className="time-recieve-goods">
              <img
                src={
                  "https://cdn.prod.website-files.com/5fb85f26f126ce08d792d2d9/607cdb2f875a62174a2ac9e3_After_GHN.png"
                }
                style={{
                  width: "130px",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              />
              <span>Thời gian nhận hàng dự kiến: {dayShip}</span>
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <div style={{ marginLeft: "auto" }}>
                Tổng số tiền ({total.totalQuantity} sản phẩm)
                <span className="total-money-before">
                  {formatMoney(total.totalMoney)}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <ModalCreateAddress
        visible={modalVisibleAddAddress}
        onCancel={handleCancel}
        id={userId}
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
              }}
            >
              <Row style={{ marginTop: "20px" }}>
                <Col span={2}>
                  <Radio
                    name="group-radio"
                    value={item}
                    checked={
                      !clickRadio
                        ? item.status === "DANG_SU_DUNG"
                        : index === clickRadio
                    }
                    onChange={() => changeRadio(index, item)}
                  />
                </Col>
                <Col span={17}>
                  <Row>
                    <span
                      style={{ fontSize: 17, fontWeight: 600, marginRight: 3 }}
                    >
                      {item.fullName}
                    </span>
                    {"  |  "}
                    <span style={{ marginTop: "2px", marginLeft: 3 }}>
                      {item.phoneNumber}
                    </span>
                  </Row>
                  <Row>
                    <span style={{ fontSize: 14 }}>{item.address}</span>
                  </Row>
                  {item.status === "DANG_SU_DUNG" ? (
                    <Row>
                      <div style={{ marginTop: "10px", marginRight: "30px" }}>
                        <span className="status-default-address">Mặc định</span>
                      </div>
                    </Row>
                  ) : null}
                </Col>
                <Col span={4}>
                  <Button
                    type="dashed"
                    title="Chọn"
                    style={{
                      border: "1px solid #ff4400",
                      fontWeight: "470",
                    }}
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
      <ModalCreateAddressAccount
        modalAddressAccount={modalAddressAccount}
        setModalAddressAccount={setModalAddressAccount}
        getAddressDefault={getAddressDefault}
      />
    </div>
  );
}
export default PaymentAccount;
