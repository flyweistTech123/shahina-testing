/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";

const MenuOptions = () => {
  const items = [
    {
      label: (
        <Link to={"/services/services"}>
          Services
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="/limited-deals">
          Limited Time Offers{" "}
        </Link>
      ),
      key: "1",
    },
  ];

  return (
    <header className="Nav_Menu_Container ">
      <ul>
        <Link to="/">
          HOME
        </Link>
        <Link to={"shop"}>
          SHOP
        </Link>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          className="antd_dropdown"
        >
          <li onClick={(e) => e.preventDefault()}>SERVICES</li>
        </Dropdown>
        <Link to={"membership"}>
          MEMBERSHIP
        </Link>
        <Link to={"gallery"}>
          GALLERY
        </Link>
        <a href="/paymentplan">
          PAYMENT PLANS
        </a>
        <Link to={"contact"}>
          CONTACT
        </Link>
        <Link to={"aboutus"}>
          ABOUT US
        </Link>
      </ul>
    </header>
  );
};

export default MenuOptions;
