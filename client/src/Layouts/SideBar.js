import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  PartitionOutlined,
  CrownFilled,
  InsuranceFilled,
  MenuOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";

const SideBar = (props) => {
  const navigate = useNavigate();
  const {
    authState: { user },
    openSideBar,
  } = useAppContext();
  const { tag, open, onClick } = props;
  return (
    <aside
      className={`${
        open ? "basis-1/6" : "basis-1/12"
      } duration-300 bg-white drop-shadow-md justify-between items-center relative`}
      aria-label="Sidebar">
      <div onClick={onClick}>
        {open ? (
          <img
            src="http://localhost:3000/image/logo.png"
            alt="logo"
            className="w-8 md:w-8 lg:w-16 h-8 md:h-8 lg:h-16 mx-auto"
          />
        ) : (
          <div className="w-8 md:w-8 lg:w-16 h-8 md:h-8 lg:h-16 mx-auto text-5xl hover:bg-red-500">
            <MenuOutlined />
          </div>
        )}
      </div>
      <div className="overflow-y-auto max-h-screen mx-auto py-4 px-3 mt-10 rounded dark:bg-gray-800">
        <ul className="space-y-4">
          {user.role !== 1 && (
            <li>
              <Link
                to="/home"
                className={
                  tag !== "kho"
                    ? "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100"
                }>
                <img
                  src="http://localhost:3000/image/kho.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && "mx-auto"}`}
                />
                {open && <span className="ml-3">Kho</span>}
              </Link>
            </li>
          )}
          {user.role === 2 && (
            <li>
              <Link
                to="/produce"
                className={
                  tag !== "sx"
                    ? "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100"
                }>
                <img
                  src="http://localhost:3000/image/daily.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && "mx-auto"}`}
                />
                {open && <span className="ml-3">Sản xuẩt</span>}
              </Link>
            </li>
          )}

          {user.role !== 1 && (
            <li>
              <Link
                to="/request"
                className={
                  tag !== "yc"
                    ? "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100"
                }>
                <img
                  src="http://localhost:3000/image/request.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && "mx-auto"}`}
                />
                {open && <span className="ml-3">Yêu Cầu</span>}
              </Link>
            </li>
          )}

          {user.role === 1 && (
            <li>
              <Link
                to="/productline"
                className={
                  tag !== "dsp"
                    ? "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100"
                }>
                <img
                  src="http://localhost:3000/image/kho.png"
                  alt="dsp"
                  className={`w-4 md:w-4 lg:w-6 ${!open && "mx-auto"}`}
                />
                {open && <span className="ml-3">Dòng sản phẩm</span>}
              </Link>
            </li>
          )}

          {user.role === 1 && (
            <li>
              <Link
                to="/user"
                className={
                  tag !== "tk"
                    ? "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100"
                }>
                <img
                  src="http://localhost:3000/image/kho.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && "mx-auto"}`}
                />
                {open && <span className="ml-3">Tài khoản</span>}
              </Link>
            </li>
          )}

          {user.role === 3 && (
            <li>
              <Link
                to="/import/productline"
                className={
                  tag !== "nh"
                    ? "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100"
                }>
                <img
                  src="http://localhost:3000/image/kho.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && "mx-auto"}`}
                />
                {open && <span className="ml-3">Nhập hàng</span>}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
