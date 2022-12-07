import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  PartitionOutlined,
  CrownFilled,
  InsuranceFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const SideBar = ({ tag, childrenTag, ...props }) => {
  const navigate = useNavigate();
  const [openStatistic, setOpenStatistic] = useState('false');
  const items = [
    {
      label: "Home",
      key: "home",
      icon: (
        <img
          src="http://localhost:3000/image/kho.png"
          alt="kho"
          className="w-4 md:w-4 lg:w-6"
        />
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
    navigate(`/${record.key}`);
  };

  const {
    authState: { user },
  } = useAppContext();

  return (
    <aside
      className="basis-1/6 bg-white drop-shadow-md justify-between items-center"
      aria-label="Sidebar">
      <div>
        <img
          src="http://localhost:3000/image/logo.png"
          alt="logo"
          className="mt-2 w-32 md:w-40 lg:w-44 xl:w-48 mx-auto"
        />
      </div>
      <div className="overflow-y-auto max-h-screen container mx-auto py-4 px-3 mt-10 rounded dark:bg-gray-800">
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
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]">
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
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]">
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
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]">
                <img
                  src="http://localhost:3000/image/request.png"
                  alt="request"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Yêu Cầu</span>
              </div>
            )}
          </li>
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
                className="w-4 md:w-4 lg:w-6"
              />
              <span className="ml-3">Dòng sản phẩm</span>
            </Link>
          </li>
          {/*
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
                  className="w-4 md:w-4 lg:w-6"
                />
                <span className="ml-3">Tài khoản</span>
              </Link>
              </li>
              )}*/}
            <li>
            {tag === "dsp" && (
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]">
                <img
                  src="http://localhost:3000/image/request.png"
                  alt="request"
                  className="w-4 md:w-4 lg:w-6"></img>
                <span className="ml-3">Dòng sản phẩm</span>
              </div>
            )}
          </li>
          <li>
            {tag !== "stt" && (
              <div>
                <Link
                  to="/statistic"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <img
                    src="http://localhost:3000/image/statistic.png"
                    alt="statistic"
                    className="w-4 md:w-4 lg:w-6"></img>
                  <span className="ml-3">Thống kê</span>
                </Link>
                { childrenTag && 
                  <div className="flex flex-col items-start ml-11 text-xs lg:text-base space-y-1">
                      {
                        childrenTag == 'stt' &&
                        <div className="rounded-lg bg-[#e6f4ff]">
                          <Link to="/statistic/status" className="p-2 text-xs lg:text-base font-normal text-gray-900">
                            Theo trạng thái
                          </Link>
                        </div>
                      }
                      {
                        childrenTag !== 'stt' && 
                        <div>
                          <Link> Theo trạng thái</Link>
                        </div>
                      }
                      {
                        childrenTag == 'produce' &&
                        <div>
                          <Link>Theo cơ sở sản xuất</Link>
                        </div>
                      }
                      {
                        childrenTag !== 'produce' &&
                        <div>
                          <Link>Theo cơ sở sản xuất</Link>
                        </div>
                      }
                      {
                        childrenTag == 'sales' &&
                        <div>
                          <Link>Theo đại lý phân phối</Link>
                        </div>
                      }
                       {
                        childrenTag !== 'sales' &&
                        <div>
                          <Link>Theo đại lý phân phối</Link>
                        </div>
                      }
                      {
                        childrenTag == 'center' &&
                        <div>
                          <Link>Theo trung tâm bảo hành</Link>
                        </div>
                      }
                      {
                        childrenTag !== 'center' &&
                        <div>
                          <Link>Theo trung tâm bảo hành</Link>
                        </div>
                      }
                  </div>
                }    
              </div>
            )}
            {tag === "stt" && (
              <div>
                <Link
                  to="/statistic"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]">
                  <img
                    src="http://localhost:3000/image/statistic.png"
                    alt="statistic"
                    className="w-4 md:w-4 lg:w-6"></img>
                  <span className="ml-3">Thống kê</span>
                </Link>
                <div className="flex flex-col items-start ml-11 text-xs lg:text-base space-y-1">
                  <div> <Link to="/statistic/status">Theo trạng thái</Link></div>
                  <div> <Link>Theo cơ sở sản xuất</Link></div>
                  <div> <Link>Theo đại lý phân phối</Link></div>
                  <div> <Link>Theo trung tâm bảo hành</Link></div>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
