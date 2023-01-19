import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { useAppContext } from '../contexts/AppContext';

const SideBar = (props) => {
  const {
    authState: { user },
  } = useAppContext();
  const { tag, open, onClick, childrenTag } = props;

  return (
    <aside
      className={`${
        open ? 'basis-1/6' : 'basis-1/12'
      } duration-300 bg-white drop-shadow-md justify-between items-center relative`}
      aria-label="Sidebar"
    >
      <div onClick={onClick}>
        {open ? (
          <img
            src="/image/logo.png"
            alt="logo"
            className="h-8 md:h-8 lg:h-16 mx-auto w-[140px] mt-[10px]"
          />
        ) : (
          <div className="w-8 md:w-8 lg:w-16 h-8 md:h-8 lg:h-16 mx-auto text-5xl hover:bg-red-500">
            <MenuOutlined />
          </div>
        )}
      </div>
      <div className="overflow-y-auto max-h-screen mx-auto py-4 px-3 mt-10 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          {user.role !== 1 && (
            <li>
              <Link
                to="/home"
                className={
                  tag !== 'kho'
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                }
              >
                <img
                  src="/image/kho.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base ">Kho</span>}
              </Link>
            </li>
          )}
          {user.role === 2 && (
            <li>
              <Link
                to="/produce"
                className={
                  tag !== 'sx'
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                }
              >
                <img
                  src="/image/daily.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base">Sản xuẩt</span>}
              </Link>
            </li>
          )}

          {user.role !== 1 && (
            <li>
              <Link
                to="/request"
                className={
                  tag !== 'yc'
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                }
              >
                <img
                  src="/image/request.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base">Yêu Cầu</span>}
              </Link>
            </li>
          )}

          {user.role === 1 && (
            <li>
              <Link
                to="/productline"
                className={
                  tag !== 'dsp'
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                }
              >
                <img
                  src="/image/kho.png"
                  alt="dsp"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base">Dòng sản phẩm</span>}
              </Link>
            </li>
          )}

          {user.role === 1 && (
            <li>
              <Link
                to="/user"
                className={
                  tag !== 'tk'
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                }
              >
                <img
                  src="/image/kho.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base">Tài khoản</span>}
              </Link>
            </li>
          )}

          {user.role === 3 && (
            <li>
              <Link
                to="/import/productline"
                className={
                  tag !== 'nh'
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                }
              >
                <img
                  src="/image/kho.png"
                  alt="kho"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base">Nhập hàng</span>}
              </Link>
            </li>
          )}
          {user.role === 1 && (
            <li>
              <Link
                to="/statistic"
                className={
                  tag === 'stt' && !childrenTag
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              >
                <img
                  src="/image/statistic.png"
                  alt="statistic"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base">Thống kê</span>}
              </Link>
              {tag === 'stt' && (
                <div className="flex flex-col items-start ml-11 text-xs lg:text-sm space-y-1">
                  <div className={childrenTag === 'stt' ? 'p-1 rounded-lg bg-[#e6f4ff]' : ''}>
                    <Link to="/statistic/status" className="text-xs lg:text-sm font-normal text-gray-900">
                      {' '}
                      Theo trạng thái{' '}
                    </Link>
                  </div>

                  <div className={childrenTag === 'produce' ? 'p-1 rounded-lg bg-[#e6f4ff]' : ''}>
                    <Link to="/statistic/manufacture_factory" className="text-xs lg:text-sm font-normal text-gray-900">
                      Theo cơ sở sản xuất
                    </Link>
                  </div>

                  <div className={childrenTag === 'sales' ? 'p-1 rounded-lg bg-[#e6f4ff]' : ''}>
                    <Link to="/statistic/sale" className="text-xs lg:text-sm font-normal text-gray-900">
                      Theo đại lý phân phối
                    </Link>
                  </div>

                  <div className={childrenTag === 'center' ? 'p-1 rounded-lg bg-[#e6f4ff]' : ''}>
                    <Link to="/statistic/center" className="text-xs lg:text-sm font-normal text-gray-900">
                      Theo trung tâm bảo hành
                    </Link>
                  </div>
                </div>
              )}
            </li>
          )}
          {(user.role === 2 || user.role === 3 || user.role === 4) && (
            <li>
              <Link
                to="/statistic/product_statistic"
                className={
                  tag === 'ps'
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              >
                <img
                  src="/image/statistic.png"
                  alt="statistic"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base">Thống kê sản phẩm</span>}
              </Link>
            </li>
          )}
          {(user.role === 2 || user.role === 3) && (
            <li>
              <Link
                to="/statistic/sold_statistic"
                className={
                  tag === 'ss'
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              >
                <img
                  src="/image/statistic.png"
                  alt="statistic"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base"> Thống kê sản phẩm bán ra </span>}
              </Link>
            </li>
          )}
          {user.role === 2 && (
            <li>
              <Link
                to="/statistic/failed_statistic"
                className={
                  tag === 'fs' && !childrenTag
                    ? 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-[#e6f4ff]'
                    : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              >
                <img
                  src="/image/statistic.png"
                  alt="statistic"
                  className={`w-4 md:w-4 lg:w-6 ${!open && 'mx-auto'}`}
                />
                {open && <span className="ml-3 text-xs sm:text-sm md:text-base"> Thống kê sản phẩm bị lỗi </span>}
              </Link>
              {tag === 'fs' && (
                <div className="flex flex-col items-start ml-11 text-xs lg:text-sm space-y-1">
                  <div className={childrenTag === 'fpl' ? 'p-1 rounded-lg bg-[#e6f4ff]' : ''}>
                    <Link to="/statistic/failed_productline" className="text-xs lg:text-sm font-normal text-gray-900">
                      {' '}
                      Theo dòng sản phẩm{' '}
                    </Link>
                  </div>

                  <div className={childrenTag === 'fmf' ? 'p-1 rounded-lg bg-[#e6f4ff]' : ''}>
                    <Link
                      to="/statistic/failed_manufacture_factory"
                      className="text-xs lg:text-sm font-normal text-gray-900"
                    >
                      Theo đại lý phân phối
                    </Link>
                  </div>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
