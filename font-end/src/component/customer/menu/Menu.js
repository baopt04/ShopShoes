<<<<<<< HEAD
// import { useState, useEffect } from "react";
// import "./style-menu.css";
// import { useCart } from "./../../../pages/customer/cart/CartContext";
// import logo from "./../../../assets/images/logo_client.png";
// import { Link } from "react-router-dom";
// import { Select, Input, Button, Menu, Badge } from "antd";
// import {
//   SearchOutlined,
//   LoginOutlined,
//   ShoppingCartOutlined,
//   MenuFoldOutlined,
// } from "@ant-design/icons";

// const { Option } = Select;
// function HeaderMenu() {
//   const [isOptionVisible, setOptionVisible] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [activeField, setActiveField] = useState("");
//   const idAccount = sessionStorage.getItem("idAccount");
//   const { totalQuantity } = useCart();

//   const fields = [
//     {
//       className: "title-menu",
//       title: "TRANG CHỦ",
//       href: "/home",
//     },
//     {
//       className: "title-menu",
//       title: "SẢN PHẨM",
//       href: "/products",
//     },
//     {
//       className: "title-menu",
//       title: "NAM",
//       href: "/products",
//     },
//     {
//       className: "title-menu",
//       title: "NỮ",
//       href: "/products",
//     },

//     {
//       className: "title-menu",
//       title: "VỀ CHÚNG TÔI",
//       href: "/about-us",
//       option: [
//         { title: "Blog styte", className: "title-option" },
//         { title: "Liên hệ", className: "title-option" },
//       ],
//     },
//     // {
//     //   className: "title-menu",
//     //   title: "SALE OFF",
//     // },
//   ];

//   const handleMenuHover = (title) => {
//     setOptionVisible(true);
//     setActiveField(title);
//   };

//   const handleMenuLeave = () => {
//     setOptionVisible(false);
//     setActiveField("");
//   };
//   const onSearch = () => {
//     setModal(true);
//   };

//   const offSearch = () => {
//     setModal(false);
//   };

//   return (
//     <div className="menu">
//       <div className="menu-content">
//         <div className="logo-menu">
//           <Link to="/home">
//             {" "}
//             <img className="logo-img" src={logo} alt="..." />
//           </Link>
//         </div>
//         <div className="space-menu">
//           {fields.map((field, index) => {
//             return (
//               <div
//                 className={field.className}
//                 key={index}
//                 onMouseEnter={() => handleMenuHover(field.title)}
//                 onMouseLeave={handleMenuLeave}
//               >
//                 <Link to={field.href} className="link-menu">
//                   {field.title}
//                 </Link>
//                 {field.option &&
//                   isOptionVisible &&
//                   activeField === field.title && (
//                     <Menu className="option-container">
//                       {field.option.map((option, optionIndex) => (
//                         <Link to="/diem">
//                           <div key={optionIndex} className={option.className}>
//                             {option.title}
//                           </div>
//                         </Link>
//                       ))}
//                     </Menu>
//                   )}
//               </div>
//             );
//           })}
//         </div>
//         <div className="right-menu">
//           <div className="search-menu">
//             <SearchOutlined
//               style={{ fontSize: "20px" }}
//               onClick={() => onSearch()}
//             />
//           </div>
//           |
//           <div>
//             <Link to="/cart">
//               <Badge
//                 size="small"
//                 count={totalQuantity}
//                 style={{
//                   backgroundColor: "#ff4400",
//                   fontSize: "10px",
//                   height: "15px",
//                   width: "15px",
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 <ShoppingCartOutlined
//                   className="cart-menu"
//                   style={{ fontSize: "22px" }}
//                 />
//               </Badge>
//             </Link>
//           </div>
//           <div className="icon-menu-block">
//             <MenuFoldOutlined />
//           </div>
//         </div>
//       </div>

//       {/* <div> */}

//       <div className={`search-panel ${modal === true ? "visible" : "hidden"}`}>
//         <div className="header-search">
//           <div className="text-search">Tìm kiếm sản phẩm</div>

//           <div className="exit-search">
//             <LoginOutlined style={{ color: "#ff4400" }} onClick={offSearch} />
//           </div>
//         </div>

//         {/* content */}
//         <div>
//           <Input className="input-search-products" placeholder="Sản phẩm..." />

//           <Select className=" custom-select" style={{ width: "100%" }}>
//             <Option>aa</Option>
//           </Select>

//           <Button className=" button-search">Tìm kiếm</Button>
//         </div>
//       </div>
//     </div>
//     // </div>
//   );
// }

// export default HeaderMenu;


import {
  LoginOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Menu, Select } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../../../assets/images/logo_client.png";
import { useCart } from "./../../../pages/customer/cart/CartContext";
import "./style-menu.css";
=======
import { useState, useEffect } from "react";
import "./style-menu.css";
import { useCart } from "./../../../pages/customer/cart/CartContext";
import logo from "./../../../assets/images/login_new.png";
import { deleteToken } from "../../../helper/useCookies";
import { Link, useNavigate } from "react-router-dom";
import { Select, Input, Button, Menu, Badge } from "antd";
import {
  SearchOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  MenuFoldOutlined,
  FileSearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257

const { Option } = Select;
function HeaderMenu() {
  const [isOptionVisible, setOptionVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeField, setActiveField] = useState("");
  const idAccount = sessionStorage.getItem("idAccount");
  const { totalQuantity } = useCart();
<<<<<<< HEAD

=======
  const [openInfor, setOpenInfo] = useState(false);
  const nav = useNavigate();
>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257
  const fields = [
    {
      className: "title-menu",
      title: "TRANG CHỦ",
      href: "/home",
    },
    {
      className: "title-menu",
      title: "SẢN PHẨM",
      href: "/products",
    },
<<<<<<< HEAD
    // {
    //   className: "title-menu",
    //   title: "NAM",
    //   href: "/products",
    // },
    // {
    //   className: "title-menu",
    //   title: "NỮ",
    //   href: "/products",
    // },
=======
    {
      className: "title-menu",
      title: "GIÀY THỂ THAO NAM NỮ",
      href: "/products",
    },
>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257

    {
      className: "title-menu",
      title: "VỀ CHÚNG TÔI",
      href: "/about-us",
      option: [
        { title: "Blog styte", className: "title-option" },
        { title: "Liên hệ", className: "title-option" },
      ],
    },
    // {
    //   className: "title-menu",
    //   title: "SALE OFF",
    // },
  ];
<<<<<<< HEAD

  const handleMenuHover = (title) => {
    setOptionVisible(true);
    setActiveField(title);
=======
  const logout = () => {
    deleteToken();
    sessionStorage.removeItem("idAccount");
    window.location.href = "/home";
  };
  const handleMenuHover = (title) => {
    setOptionVisible(true);
    setActiveField(title);
    setOpenInfo(true);
>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257
  };

  const handleMenuLeave = () => {
    setOptionVisible(false);
    setActiveField("");
<<<<<<< HEAD
  };
=======
    setOpenInfo(false);
  };

  const handleHover = (title) => {
    setOptionVisible(true);
    setActiveField(title);
  };

  const handleLeave = () => {
    setOptionVisible(false);
    setActiveField("");
  };

>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257
  const onSearch = () => {
    setModal(true);
  };

  const offSearch = () => {
    setModal(false);
  };

  return (
    <div className="menu">
      <div className="menu-content">
        <div className="logo-menu">
          <Link to="/home">
            {" "}
            <img className="logo-img" src={logo} alt="..." />
          </Link>
        </div>
        <div className="space-menu">
          {fields.map((field, index) => {
            return (
              <div
                className={field.className}
                key={index}
<<<<<<< HEAD
                onMouseEnter={() => handleMenuHover(field.title)}
                onMouseLeave={handleMenuLeave}
=======
                onMouseEnter={() => handleHover(field.title)}
                onMouseLeave={handleLeave}
>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257
              >
                <Link to={field.href} className="link-menu">
                  {field.title}
                </Link>
                {field.option &&
                  isOptionVisible &&
                  activeField === field.title && (
                    <Menu className="option-container">
                      {field.option.map((option, optionIndex) => (
                        <Link to="/diem">
                          <div key={optionIndex} className={option.className}>
                            {option.title}
                          </div>
                        </Link>
                      ))}
                    </Menu>
                  )}
              </div>
            );
          })}
        </div>
        <div className="right-menu">
          <div className="search-menu">
            <SearchOutlined
              style={{ fontSize: "20px" }}
              onClick={() => onSearch()}
            />
          </div>
          |
          <div>
            <Link to="/cart">
              <Badge
                size="small"
                count={totalQuantity}
                style={{
                  backgroundColor: "#ff4400",
                  fontSize: "10px",
                  height: "15px",
                  width: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ShoppingCartOutlined
                  className="cart-menu"
                  style={{ fontSize: "22px" }}
                />
              </Badge>
            </Link>
          </div>
<<<<<<< HEAD
=======
          |
          <div
            className="content-menu-account"
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            <Link
              to={idAccount === null ? "/login" : "#"}
              className="title-menu-account"
            >
              <span className="menu-icon">
                <UserOutlined />
              </span>{" "}
              {idAccount === null ? "Đăng nhập" : "Thông tin"}
            </Link>
            {openInfor && idAccount !== null ? (
              <ul className="dropdown-list-mn">
                <li className="dropdown-item-mn" onClick={() => nav("/profile")}>
                  Tài khoản của tôi
                </li>
                <li className="dropdown-item-mn" onClick={() => nav("/purchase")}>
                  Đơn mua
                </li>
                <li className="dropdown-item-mn" onClick={logout}>
                  Đăng xuất
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257
          <div className="icon-menu-block">
            <MenuFoldOutlined />
          </div>
        </div>
      </div>

      {/* <div> */}

      <div className={`search-panel ${modal === true ? "visible" : "hidden"}`}>
        <div className="header-search">
          <div className="text-search">Tìm kiếm sản phẩm</div>

          <div className="exit-search">
            <LoginOutlined style={{ color: "#ff4400" }} onClick={offSearch} />
          </div>
        </div>

        {/* content */}
        <div>
<<<<<<< HEAD
          {/* <Input className="input-search-products" placeholder="Sản phẩm..." />

          <Select className=" custom-select" style={{ width: "100%" }}>
            <Option>aa</Option>
          </Select> */}

          {/* <Button className=" button-search">Tìm kiếm</Button> */}
=======
          <Input className="input-search-products" placeholder="Sản phẩm..." />

          <Select className=" custom-select" style={{ width: "100%" }}>
            <Option>aa</Option>
          </Select>

          <Button className=" button-search">Tìm kiếm</Button>
>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257
        </div>
      </div>
    </div>
    // </div>
  );
}

export default HeaderMenu;
