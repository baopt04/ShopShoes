<<<<<<< HEAD
import { Col } from "antd";
import "./style-footer.css";
import logoFooter from "./../../../assets/images/logo_admin.png";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  GoogleOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import { Row } from "antd/es";
function Footer() {
  return (
    <>
      <div className="footer">
        <Row>
          <Col className="header-footer" lg={{ span: 16, offset: 4 }}>
            <Link>
              <img style={{ width: 120 }} src={logoFooter} alt="..." />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="content-footer" lg={{ span: 16, offset: 4 }}>
            <div className="category-footer">
              <div style={{ display: "flex" }}>
                <Link className="title-content-footer">TRANG CHỦ</Link>
                <Link className="title-content-footer">SẢN PHẨM</Link>
                <Link className="title-content-footer">VỀ CHÚNG TÔI</Link>
                <Link className="title-content-footer">BLOG</Link>
                <Link className="title-content-footer" to="/policy">
                  NỘI DUNG CHÍNH SÁCH
                </Link>
                <Link className="title-content-footer">LIÊN HỆ CHÚNG TÔI</Link>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Link className="icon-content-footer">
                  <FacebookOutlined />
                </Link>
                <Link className="icon-content-footer">
                  <TwitterOutlined />
                </Link>
                <Link className="icon-content-footer">
                  <YoutubeOutlined />
                </Link>
                <Link className="icon-content-footer">
                  <InstagramOutlined />
                </Link>
                <Link className="icon-content-footer">
                  <LinkedinOutlined />
                </Link>
                <Link className="icon-content-footer">
                  <GoogleOutlined />
                </Link>
              </div>
            </div>
            <Row justify={"space-between"}>
              <Col span={12}>
                <div className="category-footer1">
                  © 2023 <Link style={{ color: "#ff4400" }}>BEESNEAKER</Link>.
                  ALL RIGHTS RESERVED | PH (+09) 71833489
                </div>
                <div className="category-footer1">
                  GPĐKKD: 0315508125 do Sở KH và ĐT TPHCM cấp ngày 30/01/2019
                  Đăng ký thay đổi lần thứ 7, ngày 07 tháng 06 năm 2021
                </div>
                <div className="category-footer1">
                  Hotline: 0906.880.960 (9h-18h từ Thứ 2 đến Thứ 6) Email:
                  beesneakerfpthn@gmail.com
                </div>
              </Col>
              <Col>
                <ReactPlayer
                  url="https://youtu.be/GdlSWFyYA8s?si=n-bxZFROzNHAUr5s"
                  width={"250px"}
                  height={"150px"}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
=======
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import "./style-footer.css";

function Footer() {
  return (
    <div className="footer">
      <Row gutter={40} justify="space-between" className="footer-top">
        <Col span={8} className="footer-branding">
          {/* <img src={logoFooter} alt="Logo" className="footer-logo" /> */}
          <p className="footer-description">
            Chúng tôi mang đến những đôi giày thời trang chất lượng, phù hợp với
            mọi phong cách sống.
          </p>
        </Col>

        <Col span={6} className="footer-quick-links">
          <h4 className="footer-heading">Khám Phá</h4>
          <ul>
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/products">Sản Phẩm</Link>
            </li>
            <li>
              <Link to="/about">Về Chúng Tôi</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/policy">Chính Sách</Link>
            </li>
            <li>
              <Link to="/contact">Liên Hệ</Link>
            </li>
          </ul>
        </Col>

        <Col span={6} className="footer-contact">
          <h4 className="footer-heading">Liên Hệ</h4>
          <ul>
            <li>
              Hotline: <a href="tel:0906880960">0384.999.999</a>
            </li>
            <li>
              Email: <a href="mailto:sd-32@gmail.com">sd-32@gmail.com</a>
            </li>
            <li>Địa chỉ: 123 Đường ABC, TP. Hồ Chí Minh</li>
          </ul>
        </Col>

        <Col span={4} className="footer-social">
          <h4 className="footer-heading">Kết Nối Với Chúng Tôi</h4>
          <div className="social-icons">
            <Link
              to="https://facebook.com"
              className="social-icon"
              style={{ paddingRight: "5px" }}
            >
              <FacebookOutlined />
            </Link>
            <Link
              to="https://twitter.com"
              className="social-icon"
              style={{ paddingRight: "5px" }}
            >
              <TwitterOutlined />
            </Link>
            <Link
              to="https://youtube.com"
              className="social-icon"
              style={{ paddingRight: "5px" }}
            >
              <YoutubeOutlined />
            </Link>
            <Link
              to="https://instagram.com"
              className="social-icon"
              style={{ paddingRight: "5px" }}
            >
              <InstagramOutlined />
            </Link>
          </div>
        </Col>
      </Row>

      <Row justify="center" className="footer-bottom-info">
        <Col span={20}>
          <div className="footer-copy">
            <p>
              © 2024 <span className="highlight">SHOP SHOES</span>. All Rights
              Reserved.
            </p>
            <p className="footer-contact-info">
              Hotline: 0384.999.999 (9h-18h từ Thứ 2 đến Thứ 6)
            </p>
            <p>Email: sd-32@gmail.com</p>
          </div>
        </Col>
      </Row>
    </div>
>>>>>>> c50ea1c5ea30c42bdfd9db420cf3f3440460b257
  );
}

export default Footer;
