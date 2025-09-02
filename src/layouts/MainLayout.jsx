import React, { useState } from "react";
import Sidebar from "../components/LeftSidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Hamid from "../assets/images/userProfile.png";

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const suggestions = [
    { username: "ammar_hehehe", name: "Followed by ahmadmujtab_a", img: Hamid },
    { username: "owner.5050", name: "Followed by ahmadmujtab_a", img: Hamid },
    { username: "the_aawaiz", name: "Followed by ahmadmujtab_a", img: Hamid },
    { username: "muhmd._01x", name: "Followed by ahmadmujtab_a", img: Hamid },
    { username: "Ali_BX_01x", name: "Followed by ahmadmujtab_a", img: Hamid },
  ];

  return (
    <div className="main-layout">
      <Header toggleValue={toggleSidebar}>
        <div className="inner-layout">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="page-content">
            <Outlet />
          </div>
          <div className="suggestion-main-div">
            <div className="suggestion-inner-div">
              <div
                className="p-3 text-white"
                style={{ backgroundColor: "#000", minHeight: "100vh" }}
              >
                {/* Profile */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={Hamid}
                    width="40"
                    height="40"
                    alt="profile"
                    className="rounded-circle me-2"
                  />
                  <div>
                    <strong>hamidshiq008</strong>
                    <p
                      className="mb-0 text-secondary"
                      style={{ fontSize: "14px" }}
                    >
                      Hamid Raza
                    </p>
                  </div>
                  <button
                    className="btn  text-primary ms-auto p-0"
                    style={{ fontSize: "12px", color: "#85A1FF" }}
                  >
                    Switch
                  </button>
                </div>

                {/* Suggestions */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="text-secondary m-0">Suggested for you</p>
                  <button
                    className="btn text-light p-0"
                    style={{ fontSize: "12px" }}
                  >
                    See All
                  </button>
                </div>

                {suggestions.map((s, i) => (
                  <div key={i} className="d-flex align-items-center mb-3">
                    <img
                      src={s.img}
                      alt={s.username}
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <strong style={{ fontSize: "14px" }}>{s.username}</strong>
                      <p
                        className="mb-0 text-secondary"
                        style={{ fontSize: "12px" }}
                      >
                        {s.name}
                      </p>
                    </div>
                    <button
                      className="btn  text-primary ms-auto p-0"
                      style={{ fontSize: "12px" }}
                    >
                      Follow
                    </button>
                  </div>
                ))}

                {/* Footer */}
                <div
                  className="text-secondary mt-4"
                  style={{ fontSize: "12px" }}
                >
                  <p>
                    About · Help · Press · API · Jobs · Privacy · Terms ·
                    Locations · Meta Verified
                  </p>
                  <p>© 2025 INSTAGRAM FROM META</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default MainLayout;
