import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  PartitionOutlined,
  CrownFilled,
  InsuranceFilled,
} from "@ant-design/icons";
import { Menu } from "antd";

const SideBar = ({ tag, ...props }) => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      key: "home",
      icon: (
        <img src="http://localhost:3000/image/kho.png" alt="kho" className="w-4 md:w-4 lg:w-6" />
      ),
    },
    {
      label: "Productline",
      key: "productline",
      icon: (
        <img
          src="http://localhost:3000/image/daily.png"
          alt="produce"
          className="w-4 md:w-4 lg:w-6"
        />
      ),
    },
  ];

  const handleCLick = (record) => {
    navigate(`/${record.key}`)
  }
  return (
    <aside
      className="basis-1/6 bg-white drop-shadow-md justify-between items-center"
      aria-label="Sidebar">
      <div>
        <img
          src="http://localhost:3000/image/logo.png"
          alt="logo"
          className="w-8 md:w-8 lg:w-16 h-8 md:h-8 lg:h-16 mx-auto"
        />
      </div>
      <div className="overflow-y-auto max-h-screen mx-auto py-4 px-3 mt-10 rounded dark:bg-gray-800">
        <ul className="space-y-4">
          <li>
            {tag !== "kho" && (
              <Link
                to="/home"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img
                  src="http://localhost:3000/image/kho.png"
                  alt="kho"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Kho</span>
              </Link>
            )}
            {tag === "kho" && (
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100">
                <img
                  src="http://localhost:3000/image/kho.png"
                  alt="kho"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Kho</span>
              </div>
            )}
          </li>
          <li>
            {tag !== "sx" && (
              <Link
                to="/produce"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img
                  src="http://localhost:3000/image/daily.png"
                  alt="produce"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Sản xuẩt</span>
              </Link>
            )}
            {tag === "sx" && (
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100">
                <img
                  src="http://localhost:3000/image/daily.png"
                  alt="prduce"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Sản xuất</span>
              </div>
            )}
          </li>
          <li>
            {tag !== "yc" && (
              <Link
                to="/request"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img
                  src="http://localhost:3000/image/request.png"
                  alt="request"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Yêu Cầu</span>
              </Link>
            )}
            {tag === "yc" && (
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100">
                <img
                  src="http://localhost:3000/image/request.png"
                  alt="request"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Yêu Cầu</span>
              </div>
            )}
          </li>
          <li>
            {tag !== "dsp" && (
              <Link
                to="/productline"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img
                  src="http://localhost:3000/image/request.png"
                  alt="request"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Dòng sản phẩm</span>
              </Link>
            )}
            {tag === "dsp" && (
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100">
                <img
                  src="http://localhost:3000/image/request.png"
                  alt="request"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Dòng sản phẩm</span>
              </div>
            )}
          </li>
        </ul>
        {/* <Menu
          defaultSelectedKeys={["home"]}
          mode="inline"
          theme="light"
          items={items}
          onClick={handleCLick}
        /> */}
      </div>
    </aside>
  );
};
export default SideBar;
