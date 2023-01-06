import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
  ColouredLogo,
  dbIcon,
  dbActive,
  InactiveDoc,
  ActiveExplore,
  InactiveExplore,
  strokeIcon,
} from "../../assets/index";

// inactive-dashboard.svg
const SideBar = () => {
  const [showExplore, setShowExplore] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className="w-full ">
      <div className="w-[15%] fixed top-0 left-0 bottom-0 mr-[15%] bg-mainWhite hidden bg:block text-[14px] xl:text-[16px]">
        <Link to="/dashboard">
          <img src={ColouredLogo} className="flex pt-10 m-auto" />
        </Link>
        <div className="mt-10">
          <Link
            to="/dashboard"
            className={
              splitLocation[2] != "explore" && splitLocation[2] != "docs"
                ? `text-mainBlue py-5 bg-gradedBlue border-l-4 border-l-mainBlue flex items-center pl-10`
                : "bg-mainWhite py-5 flex items-center pl-10"
            }
          >
            {splitLocation[2] != "explore" ? (
              <img src={dbActive} className="mr-2" />
            ) : (
              <img src={dbActive} className="mr-3" />
            )}
            <button>Dashboard</button>
          </Link>
          <Link to="#">
            <div
              onClick={() => setShowExplore(!showExplore)}
              className={
                splitLocation[2] === "explore"
                  ? `text-mainBlue py-5 bg-gradedBlue border-l-4 border-l-mainBlue flex items-center pl-10`
                  : "bg-mainWhite py-5 flex items-center pl-10"
              }
            >
              {showExplore ? (
                <img src={ActiveExplore} className="mr-2" />
              ) : (
                <img src={InactiveExplore} className="mr-3" />
              )}
              <p className="w-full flex justify-between items-center pr-5">
                Explore
                <span className="text-greyTen">
                  {showExplore ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </span>
              </p>
            </div>
            {showExplore && (
              <div className="ml-10">
                {/* <Link
                  to="explore/debug"
                  className={
                    splitLocation[3] === "debug"
                      ? `text-mainBlue py-3 flex items-center pl-5`
                      : " py-3 flex items-center pl-5"
                  }
                >
                  <div className="flex items-center">
                    <div className="border-b-2 w-5 rounded-xl"></div> Debug
                  </div>
                </Link> */}
                <Link
                  to="explore/subscription"
                  className={
                    splitLocation[3] === "subscription"
                      ? `text-mainBlue py-3 flex items-center pl-5`
                      : "py-3 flex items-center pl-5"
                  }
                >
                  <div className="flex items-center">
                    <div className="border-b-2 w-5 rounded-xl"></div>{" "}
                    Subsciption
                  </div>
                </Link>
                <Link
                  to="explore/pricing"
                  className={
                    splitLocation[3] === "pricing"
                      ? `text-mainBlue py-3 flex items-center pl-5`
                      : "py-3 flex items-center pl-5"
                  }
                >
                  <div className="flex items-center">
                    <div className="border-b-2 w-5 rounded-xl"></div> Pricing
                  </div>
                </Link>
              </div>
            )}
          </Link>

          <Link
            to="docs"
            // href="https://documenter.getpostman.com/view/2205059/2s8Z73wpyS"
            // target="_blank"
            className="flex items-center pl-10 py-5"
          >
            {splitLocation[3] === "docs" ? (
              <img src={InactiveDoc} className="mr-2" />
            ) : (
              <img src={InactiveDoc} className="mr-3" />
            )}
            <span className="w-full flex justify-between items-center pr-5">
              Docs <img src={strokeIcon} />
            </span>
          </Link>
          <Link to="/contact" className="flex items-center pl-10 py-5">
            {splitLocation[1] === "dashboard" ? (
              <img src={dbIcon} className="mr-2" />
            ) : (
              <img src={dbActive} className="mr-3" />
            )}
            <span className="w-full flex justify-between items-center pr-5">
              Contact <img src={strokeIcon} />
            </span>
          </Link>
          <div></div>
          <div></div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SideBar;
