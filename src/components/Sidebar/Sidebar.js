/** @format */

import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, LOGOUT } from "../../store/authSlice";
import { openQuiz } from "../../store/quizSlice";
import AcneQuiz from "../AcneQuiz/AcneQuiz";
import { getProfile } from "../../Repository/Api";
import { AiOutlineClose } from "react-icons/ai";
import { MenuOptions } from "../../constants/constant";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const isLoggedIn = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const { isQuizOpen } = useSelector((store) => store.quiz);

  const navigationHandler = (link) => {
    onClose();
    navigate(link);
  };

  function LogoutHandler() {
    onClose();
    dispatch(LOGOUT());
    navigate("/login");
  }

  function fechProfile() {
    getProfile(setProfile);
  }

  useEffect(() => {
    if (open) {
      fechProfile();
    }
  }, [open]);

  async function openHandl() {
    await dispatch(openQuiz());
  }

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={open}
      className="sidebar"
    >
      <div className="Sidebar_Menu">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <AiOutlineClose className="closeIcon" onClick={() => onClose()} />
        </div>
        {isLoggedIn === true && (
          <>
            <div className="profile_View">
              {profile?.image ? (
                <ImageLazyLoading
                  img={profile?.image}
                  alt={"Avatar"}
                  className={"text-[10px]"}
                />
              ) : (
                <ImageLazyLoading
                  img={
                    "https://img.freepik.com/premium-vector/human-symbol-3d-icon-user-business-symbology-website-profile_593228-130.jpg?w=2000"
                  }
                  alt={"Default Avatar"}
                  className={"text-[10px]"}
                />
              )}

              <div className="content">
                <p className="title">
                  {profile?.firstName + " " + profile?.lastName}{" "}
                </p>

                <p className="email"> {profile?.email} </p>

                <Link to="/my-profile" onClick={() => onClose()}>
                  VIEW PROFILE{" "}
                </Link>
              </div>
            </div>

            <div className="empty"></div>
          </>
        )}

        <ul>
          {MenuOptions?.map((i, index) =>
            i?.title === "ACNE QUIZ" ? (
              <li key={index} onClick={() => openHandl()}>
                {i.title}
              </li>
            ) : i?.title === "PAYMENT PLANS" ? (
              <li key={index}>
                <a href={i.link}>{i.title}</a>
              </li>
            ) : (
              <li key={index} onClick={() => navigationHandler(i.link)}>
                {i.title}
              </li>
            )
          )}

          {isLoggedIn === true ? (
            <li onClick={() => LogoutHandler()}>Logout</li>
          ) : (
            <li onClick={() => navigationHandler("/login")}> LOGIN</li>
          )}
        </ul>
        {isQuizOpen && <AcneQuiz onClose={onClose} />}
      </div>
    </Drawer>
  );
};

export default Sidebar;
