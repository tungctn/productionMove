import Default from "../../Layouts/Default";
import DemoPie from "../../components/Statistic/DemoPie";

function Status() {

    return (
        <Default childrenName="stt">
            <div className="w-1/4 mx-auto mt-10 items-start">

                <label for="countries" className="block mb-2 text-xl font-medium text-blue-600 dark:text-white">Chọn trạng thái</label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-blue-600 text-sm rounded-lg ring-1 focus:ring-blue-500
                                            focus:border-blue-500 block w-full p-2.5">
                    <option selected>Trạng thái</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                </select>

            </div>
            <div className="w-5/6 mx-auto mt-20">
                <DemoPie></DemoPie>
            </div>
        </Default>
    );

}

export default Status;