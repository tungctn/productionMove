const SideBar = () => {
  return (
    <aside
      className="col-span-1 bg-white drop-shadow-md h-screen justify-between items-center"
      aria-label="Sidebar">
      <img
        src="./image/logo.png"
        alt="logo"
        className="w-8 md:w-8 lg:w-16 h-8 md:h-8 lg:h-16 ml-10"></img>
      <div className="overflow-y-auto max-h-screen py-4 px-3 mt-10 rounded dark:bg-gray-800">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <img
                src="./image/kho.png"
                alt="kho"
                className="w-4 md:w-4 lg:w-6"></img>
              <span className="ml-3">Dòng sản phẩm</span>
            </a>
          </li>
          {/* <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <img
                src="./image/daily.png"
                alt="kho"
                className="w-4 md:w-4 lg:w-6"></img>
              <span className="ml-3">Đại Lý</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <img
                src="./image/request.png"
                alt="kho"
                className="w-4 md:w-4 lg:w-6"></img>
              <span className="ml-3">Yêu Cầu</span>
            </a>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
