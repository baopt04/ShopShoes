import React, { useEffect, useState } from "react";
import "./style-layout-account.css";
import { EditOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faStore,
  faTags,
  faUserCircle,
  faCircleXmark,
  faFileLines,
  faTicket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { AccountClientApi } from "../../../../api/customer/account/accountClient.api";
import { UseSelector, Use } from "react-redux/es/hooks/useSelector";
import {
  GetUserClient,
  SetUserClient,
} from "../../../../app/reducer/UserClient.reducer";
import { useAppSelector } from "../../../../app/hook";
import { deleteToken } from "../../../../helper/useCookies";
import dayjs from "dayjs";
import { dispatch } from "../../../../app/store";
import { Button } from "antd";
function LayoutAccount({ children }) {
  const param = useLocation();
  const [id, setId] = useState(0);
  const [formInfo, setFormInfo] = useState({});
  const [idChild, setIdChild] = useState(1);
  const idAccount = sessionStorage.getItem("idAccount");

  const page = useNavigate();
  const data = useAppSelector(GetUserClient);
  useEffect(() => {
    if (data != null) {
      setFormInfo(data);
      console.log(data);
    }
  }, [data]);
  useEffect(() => {
    AccountClientApi.getById(idAccount).then((res) => {
      const data = res.data.data.user;
      dispatch(SetUserClient(data));
    });

    switch (param.pathname) {
      case "/profile":
        setId(1);
        setIdChild(1);
        break;
      case "/account-address":
        setId(1);
        setIdChild(2);
        break;
      case "/account-password":
        setId(1);
        setIdChild(3);
        break;
      case "/purchase":
        setId(2);
        break;
      case "/notification":
        setId(3);
        break;
      // case "/voucher":
      //   setId(4);
      //   break;
      default:
        setId(4);
    }
  }, []);
  const openCateprofile = (id) => {
    setId(id);
    setIdChild(1);
  };
  const openCateChildProfile = (id) => {
    setIdChild(id);
  };

  const logout = () => {
    deleteToken();
    sessionStorage.removeItem("idAccount");
    window.location.href = "/home";
  };

  const category = [
    {
      id: 1,
      name: "Tài khoản của tôi",
      page: "/profile",
      icon: (
        <FontAwesomeIcon icon={faUserCircle} style={{ color: "#1677FF" }} />
      ),
      children: [
        {
          id: 1,
          name: "Hồ sơ",
          page: "/profile",
        },
        // {
        //   id: 2,
        //   name: "Địa chỉ",
        //   page: "/account-address",
        // },
        {
          id: 2,
          name: "Đổi mật khẩu",
          page: "/account-password",
        },
      ],
    },
    {
      id: 2,
      name: "Đơn mua",
      page: "/purchase",
      icon: <FontAwesomeIcon icon={faFileLines} style={{ color: "#1677FF" }} />,
    },
    // {
    //   id: 3,
    //   name: "Voucher",
    //   page: "/voucher",
    //   icon: <FontAwesomeIcon icon={faTicket} style={{ color: "#1677FF" }} />,
    // },
    {
      name: "Đăng xuất",
      onClick: logout,
      icon: (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ color: "#1677FF" }}
        />
      ),
    },
  ];
  return (
    <React.Fragment>
      {/* <div className="layout-title">
        <p>
          <a href="/home" style={{ textDecoration: "none" }}>
            Trang Chủ
          </a>{" "}
          |{" "}
          <a href="/profile" style={{ textDecoration: "none" }}>
            Thành Viên
          </a>{" "}
        </p>
      </div> */}
      <div className="layout-account">
        <div className="sidebar-account">
          <div className="box-persional-profile">
            <img className="avatar-account" src={formInfo.avata} alt="..." />
            <div className="name-account">
              <p style={{ fontWeight: 500 }}>{formInfo.fullName}</p>

              {/* <div style={{ color: "grey", fontSize: 14 }}>
                {" "}
                <a href="/profile">
                  <EditOutlined /> Sửa hồ sơ
                </a>
              </div> */}
            </div>
          </div>
          <div className="caterory-account">
            {category.map((item, index) => (
              <div key={index}>
                <div
                  className="box-title-category-account"
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      openCateprofile(item.id);
                      page(item.page);
                    }
                  }}
                >
                  <span style={{ width: "30px" }}>{item.icon}</span>
                  <span
                    style={{
                      color:
                        id === 1
                          ? "black"
                          : id === item.id
                          ? "#1677ff"
                          : "black",
                    }}
                    className="title-category-account"
                  >
                    {item.name}
                  </span>
                </div>

                {id === 1 && item.children ? (
                  <div className="box-child-category">
                    {item.children.map((itemChild, indexChild) => (
                      <div
                        className="title-child-category"
                        key={indexChild}
                        style={{
                          color: idChild === itemChild.id ? "#1677ff" : "black",
                        }}
                        onClick={() => {
                          openCateChildProfile(itemChild.id);
                          page(itemChild.page);
                        }}
                      >
                        {itemChild.name}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="children-account">{children}</div>
      </div>
    </React.Fragment>
  );
}

export default LayoutAccount;
