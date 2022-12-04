import Default from "../../Layouts/Default";
import DemoPie from "../../components/Statistic/DemoPie";
import {useProductContext} from "../../contexts/ProductContext";

function Statistic() {
    const {
        productState: { listProduct },
      } = useProductContext();

    const dataSource = listProduct.map((product) => {
        return {
          ...product,
          type: product.name,
          sales: product.amount,
        };
      });

    return(
        <Default tagName="stt">
            <div className="w-11/12 mx-auto mt-5 text-left text-5xl text-blue-600">Thống kê toàn quốc</div>
            <div className="w-5/6 mx-auto mt-20">
            <DemoPie data={dataSource}></DemoPie>
            </div>
        </Default>
    );

}

export default Statistic;