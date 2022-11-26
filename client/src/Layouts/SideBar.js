const SideBar = () => {
    return (
        <div class="basis-1/6 h-screen bg-white drop-shadow-md justify-between items-center" aria-label="Sidebar">
            <div>
             <img src="./image/logo.png" alt="logo" className="w-8 md:w-8 lg:w-16 h-8 md:h-8 lg:h-16 ml-10"></img>
             </div>
            <div class="overflow-y-auto max-h-screen py-4 px-3 mt-10 rounded dark:bg-gray-800">
                <ul class="ml-10 space-y-4">
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img src="./image/kho.png" alt="kho" className="w-4 md:w-4 lg:w-6"></img>
                        <span class="ml-3">Kho</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img src="./image/daily.png" alt="kho" className="w-4 md:w-4 lg:w-6"></img>
                        <span class="ml-3">Sản Xuất</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img src="./image/request.png" alt="kho" className="w-4 md:w-4 lg:w-6"></img>
                        <span class="ml-3">Yêu Cầu</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    );
}
export default SideBar;