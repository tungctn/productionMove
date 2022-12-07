import Default from "../../Layouts/Default";
import DemoPie from "../../components/Statistic/DemoPie";
import {useProductContext} from "../../contexts/ProductContext";

function Statistic() {
    const {
        productState: { listProduct },
      } = useProductContext();
    var sumProduct = 0;
    const dataSource = listProduct.map((product) => {
        sumProduct += product.productLine.amount;
        return {
          ...product,
          type: product.identifier,
          sales: product.productLine.amount,
        };
      });

    return(
        <Default tagName="stt">
            <div className="w-11/12 mx-auto mt-5 text-left text-5xl text-blue-600">Thống kê toàn quốc</div>
            <div className="w-5/6 mx-auto mt-20">
            <DemoPie data={dataSource}></DemoPie>
            <div className="mt-5 text-xl text-blue-900 font-bold">Tổng số lượng: {sumProduct}</div>
            </div>
        </Default>
    );

}

export default Statistic;