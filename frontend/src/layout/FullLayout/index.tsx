import React, { useState } from "react";
import {
  Routes,
  Route,

  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Carousel } from "antd";
//import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";

import WaterMeterMap from "../../pages/water/WaterMeterMap";
import NotificationPage from "../../pages/notification";
import ContactPage from "../../pages/contact";
import WaterDetailPage from "../../pages/water/WaterDetail";
import Water from "../../pages/water/Water";
import SignInPages from "../../pages/authentication/Login/SignInPages";
import SignUpPages from "../../pages/authentication/Register/SignUpPages";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import ProfilePage from "../../pages/profile/ProfilePage";
//import logo from "../../assets/logo.png";
import Navbar from '../../components/Navbar';
import "./index.css";

const FullLayout: React.FC = () => {
  //const location = useLocation();
  const navigate = useNavigate();
  //const isActive = (path: string) => location.pathname === path;
  const isAdminPath = useLocation().pathname.startsWith('/admin');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLogin") === "true"
  );

  // const handleMenuClick: MenuProps["onClick"] = (e) => {
  //   if (e.key === "logout") {
  //     localStorage.clear();
  //     setIsLoggedIn(false);
  //     navigate("/login");
  //   } else if (e.key === "profile") {
  //     navigate("/profile");
  //   } else if (e.key === "register") {
  //     navigate("/signup");
  //   }
  // };

  // const menuItems: MenuProps["items"] = isLoggedIn
  //   ? [
  //     {
  //       key: "profile",
  //       label: "โปรไฟล์",
  //       icon: <UserOutlined />,
  //     },
  //     {
  //       key: "logout",
  //       label: "ออกจากระบบ",
  //       icon: <LogoutOutlined />,
  //       danger: true,
  //     },
  //   ]
  //   : [
  //     {
  //       key: "register",
  //       label: "ลงทะเบียน",
  //       icon: <LoginOutlined />,
  //     },
  //   ];

  // const user = {
  //   name: "User",
  //   avatar: "",
  // };

  return (
    <div className="full-layout">
      {<Navbar />}


      {/* Main Content Area */}
      {/* Scrollable Main Content */}
      <div className="main-scroll-area">
        <Routes>
          <Route
            path="/"
            element={
              <div className="content-wrapper">
                <Carousel
                  autoplay
                  effect="fade"
                  dotPosition="bottom"
                  pauseOnHover
                >
                  <div>
                    <img
                      src="https://beta.sut.ac.th/wp-content/uploads/2022/09/banner-01-2-scaled.jpg"
                      alt="SUT Banner 1"
                      className="w-full h-auto max-h-[80vh] object-cover rounded-lg cursor-pointer"
                      onClick={() => navigate("/waterdashboard")}
                    />
                  </div>
                  <div>
                    <img
                      src="https://beta.sut.ac.th/wp-content/uploads/2022/09/sutbanner-01-scaled.jpg"
                      alt="SUT Banner 2"
                      className="w-full h-auto max-h-[80vh] object-cover rounded-lg cursor-pointer"
                      onClick={() => navigate("/waterdashboard")}
                    />
                  </div>
                </Carousel>
              </div>
            }
          />
          <Route path="/water" element={<WaterMeterMap />} />
          <Route
            path="/notification"
            element={
              isLoggedIn ? <NotificationPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/waterdetail/:id" element={<WaterDetailPage />} />
          <Route path="/login" element={<SignInPages />} />
          <Route path="/waterdashboard" element={<Water />} />
          <Route path="/signup" element={<SignUpPages />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/admin"
            element={
              localStorage.getItem("isAdmin") === "true" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default FullLayout;
