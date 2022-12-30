import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Produce from "./pages/home/Produce";
import "./index.scss";
import Page404 from "./pages/error/404";
import { useAppContext } from "./contexts/AppContext";
import Auth from "./routes/Auth";
import RequireAuth from "./routes/RequireAuth";
import Statistic from "./pages/statistic/Statistic";
import Status from "./pages/statistic/Status";
import ManufactureFactory from "./pages/statistic/ManufactureFactory";
import ProductLine from "./pages/productline/ProductLine";
import ProductLineInfo from "./pages/productline/ProductLineInfo";
import ProductLineUpdate from "./pages/productline/ProductLineUpdate";
import User from "./pages/user/User";
import ProductLineAdd from "./pages/productline/ProductLineAdd";
import { setAuthHeader } from "./api/auth";
import Import from "./pages/import/Productline";
import ImportDetail from "./pages/import/ImportDetail";
import Factory from "./pages/import/Factory";
import Request from "./pages/request/Request";
import Sale from "./pages/statistic/Sale";
import Center from "./pages/statistic/Center";
import ProductStatistic from "./pages/statistic/ProductStatistic";
import SoldStatistic from "./pages/statistic/SoldStatistic";
import Product from "./pages/product/Product";
import Profile from "./pages/profile/Profile";
import FailedStatistic from "./pages/statistic/FailedStatistic";
import FailedManufacturefactory from "./pages/statistic/FailedManufacturefactory";
import FailedProductLine from "./pages/statistic/FailedProductLine";

function App() {
  const {
    authState: { isLoading },
  } = useAppContext();

  useEffect(() => {
    if (localStorage["token"]) {
      setAuthHeader(localStorage["token"]);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/" element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />

          <Route path="/produce" element={<Produce />} />
          <Route path="/request" element={<Request />} />
          {/* productline*/}
          <Route path="/productline" element={<ProductLine />} />
          <Route path="/productline/:id" element={<ProductLineInfo />} />
          {/* <Route path="/productline/:id/edit" element={<ProductLineEdit />} />*/}
          <Route path="/productline/:id/edit" element={<ProductLineUpdate />} />
          <Route path="/productline/create" element={<ProductLineAdd />} />
          {/*statistic*/}
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/statistic/status" element={<Status />} />
          <Route
            path="/statistic/manufacture_factory"
            element={<ManufactureFactory />}
          />
          <Route path="/statistic/sale" element={<Sale />} />
          <Route path="/statistic/center" element={<Center />} />
          <Route
            path="/statistic/product_statistic"
            element={<ProductStatistic />}
          />
          <Route path="/statistic/sold_statistic" element={<SoldStatistic />} />
          <Route
            path="/statistic/failed_statistic"
            element={<FailedStatistic />}
          />
          <Route
            path="/statistic/failed_manufacture_factory"
            element={<FailedManufacturefactory />}
          />
          <Route
            path="/statistic/failed_productline"
            element={<FailedProductLine />}
          />

          {/* account */}
          <Route path="/user" element={<User />} />
          {/* importProductLine */}
          <Route path="/import/productline" element={<Import />} />
          <Route path="/import/productline/:id" element={<ImportDetail />} />
          <Route path="/import/productline/:id/factory" element={<Factory />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
