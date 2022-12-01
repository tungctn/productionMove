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

  const elements = ["kho", "sx", "yc", "dsp"];

  const imgs = [
    "http://localhost:3000/image/kho.png",
    "http://localhost:3000/image/daily.png",
    "http://localhost:3000/image/request.png",
    "http://localhost:3000/image/request.png",
  ];

  const tagNames = ["Kho", "Sản xuẩt", "Yêu Cầu", "Dòng sản phẩm"];

  const links = ["/home", "/produce", "/request", "/productline"];

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
          {elements.map((element, index) => {
            return (
              <li key={index + 1}>
                <Link
                  to={links[index]}
                  className={
                    tag !== element
                      ? "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-orange-100"
                  }>
                  <img
                    src={imgs[index]}
                    alt={element}
                    className="w-4 md:w-4 lg:w-6"></img>
                  <span className="ml-3">{tagNames[index]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
