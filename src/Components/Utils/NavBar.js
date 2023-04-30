import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import NavBarData from "./NavBarData";

const NavBar = ({ isOpen, setIsOpen, children }) => {
  const sidebarRef = useRef(null);
  const [sidebarWidth, setWidth] = useState("70px");

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const setSidebarWidth = () => {
      if (sidebarRef.current) {
        const sidebar = sidebarRef.current;
        const width = isOpen ? "200px" : "70px";
        sidebar.style.width = width;
        setWidth(width);
      }
    };

    setSidebarWidth();
  }, [isOpen]);

  return (
    <div className="navbar-container">
      <div ref={sidebarRef} className="sidebar">
        <div className="top_section">
          <div style={{ marginLeft: "8px" }} className="bars">
            <div className="bars-bg" />
            <FaBars onClick={() => setIsOpen(!isOpen)} />
          </div>
          <h1
            style={{
              display: isOpen ? "block" : "none",
              color: "orange",
              paddingLeft: "20px",
            }}
            className="logo"
          >
            ISODS
          </h1>
        </div>
        {NavBarData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main style={{ width: `calc(100% - ${sidebarWidth})` }}>{children}</main>
    </div>
  );
};

export default NavBar;
