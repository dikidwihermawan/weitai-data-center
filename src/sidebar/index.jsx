import {
  IconStack2,
  IconCoin,
  IconHome,
  IconFileHorizontal,
} from "@tabler/icons-react";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ children }) {
  const pathname = useLocation().pathname;
  return (
    <>
      <div className="sticky top-0 max-w-screen-2xl bg-white mx-auto grid grid-cols-12 min-h-screen">
        <div className="col-span-2 border-gray-200 bg-gray-800">
          <aside
            id="logo-sidebar"
            aria-label="Sidebar"
            className="bg-gray-800 min-h-screen h-full"
          >
            <div className="space-y-2 font-medium text-xs">
              <div className="flex items-center space-x-3 px-2 py-4 rtl:space-x-reverse">
                <img
                  src="/assets/weitai_logo.jpg"
                  className="h-8 rounded-full"
                  alt="PT WEITAI"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  PT WEITAI
                </span>
              </div>
              <NavLink
                to="/"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "flex items-center p-2  hover:bg-gray-700 transition-colors",
                    isPending ? "pending" : "",
                    isActive ? "bg-blue-600 text-white" : "text-white",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
              >
                <IconHome stroke={1} width={20} />
                <span className="ms-3">Dashboard</span>
              </NavLink>
              <NavLink
                to="/purchaseorder"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "flex items-center p-2 hover:bg-gray-700 transition-colors",
                    isPending ? "pending" : "",
                    isActive ? "bg-blue-600 text-white" : "text-white",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
              >
                <IconCoin stroke={1} width={20} />
                <span className="ms-3">Purchase Order</span>
              </NavLink>
              <NavLink
                to="/stocks"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "flex items-center p-2 hover:bg-gray-700 transition-colors",
                    isPending ? "pending" : "",
                    isActive ? "bg-blue-600 text-white" : "text-white",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
              >
                <IconStack2 stroke={1} width={20} />
                <span className="ms-3">Stock</span>
              </NavLink>
              <NavLink
                to="/colorwindow"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    "flex items-center p-2 hover:bg-gray-700 transition-colors",
                    isPending ? "pending" : "",
                    isActive ? "bg-blue-600 text-white" : "text-white",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
              >
                <IconFileHorizontal stroke={1} width={20} />
                <span className="ms-3">Color Window</span>
              </NavLink>
            </div>
          </aside>
        </div>
        <div className="col-span-10 px-4">{children}</div>
      </div>
    </>
  );
}
