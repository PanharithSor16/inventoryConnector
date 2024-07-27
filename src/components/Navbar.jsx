import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Ripple, Dropdown, initTWE } from "tw-elements";
import Transion from "../assets/Transition.png";
import Transfer from "../assets/Transfer.png";
import balance from "../assets/calculator.png";
import Masteritem from "../assets/list.png"
import User from "../assets/group.png"
const Navbar = () => {
  useEffect(() => {
    initTWE({ Offcanvas, Ripple, Dropdown });
  }, []);

  return (
    <div className=" bg-white">
      <button
        className=" ml-3 inline-block rounded px-3 pb-1 pt-1 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        data-twe-offcanvas-toggle
        data-twe-target="#offcanvasExample"
        aria-controls="offcanvasExample"
        data-twe-ripple-color="light"
      >
        <svg
          width="30px"
          height="20px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            fill="#000000"
            fillRule="evenodd"
            d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
          />
        </svg>
      </button>

      <div
        className="invisible fixed bottom-0 left-0 top-0 z-[1045] flex w-96 max-w-full -translate-x-full flex-col border-none bg-pink-50 bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out data-[twe-offcanvas-show]:transform-none dark:bg-body-dark dark:text-white"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        data-twe-offcanvas-init
      >
        <div className="flex items-center justify-between p-4">
          <h5
            className="mb-0 font-semibold leading-normal"
            id="offcanvasExampleLabel"
          >
            KIT Connector
          </h5>
          <button
            type="button"
            className=" hover:bg-red-300 p-1 rounded-sm box-content border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
            data-twe-offcanvas-dismiss
            aria-label="Close"
          >
            <span className="[&>svg]:h-6 [&>svg]:w-6">
              <svg
                xmlnsXlink="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          <div className=" mt-4">
            <ul className="">
              <li className=" rounded-md p-1 text-start font-medium">
               
                <Link to="/" className="hover:bg-blue-300 p-2 rounded-md flex">
                <img src={Transion} className="w-8 h-8 mr-3 -mt-1" alt="transition" />
                  TRANSITION
                </Link>
              </li>
              <li className=" mt-1 rounded-md p-1 text-start font-medium">
                <Link
                  to="/transfer"
                  className="hover:bg-blue-300 p-2 rounded-md flex"
                >
                  <img className="w-8 h-8 mr-3 -mt-1" src={Transfer} alt="transer" />
                  Transfer
                </Link>
              </li>
              <li className=" mt-1 rounded-md p-1 text-start font-medium ">
                <Link
                  to="/balance"
                  className="hover:bg-blue-300 p-2 rounded-md flex"
                >
                  <img className="w-8 h-8 mr-3 -mt-1" src={balance} alt="balance" />
                  Balance
                </Link>
              </li>
              <li className=" mt-1 rounded-md p-1 text-start font-medium">
                <Link
                  to="/masterItem"
                  className="hover:bg-blue-300 p-2 rounded-md flex"
                >
                  <img className="w-8 h-8 mr-3 -mt-1" src={Masteritem} alt="img" />
                  Master Item
                </Link>
              </li>
              <li className=" mt-1 rounded-md p-1 text-start font-medium">
                <Link
                  to="/createAccount"
                  className="hover:bg-blue-300 p-2 rounded-md flex"
                >
                  <img className="w-8 h-8 mr-3 -mt-1" src={User} alt="img" />
                  User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
