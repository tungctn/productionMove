import Home from '../pages/home/Home';
import Produce from '../pages/home/Produce';
import Factory from '../pages/import/Factory';
import ImportDetail from '../pages/import/ImportDetail';
import Import from '../pages/import/Productline';
import Product from '../pages/product/Product';
import ProductLine from '../pages/productline/ProductLine';
import ProductLineAdd from '../pages/productline/ProductLineAdd';
import ProductLineInfo from '../pages/productline/ProductLineInfo';
import ProductLineUpdate from '../pages/productline/ProductLineUpdate';
import Profile from '../pages/profile/Profile';
import Request from '../pages/request/Request';
import Center from '../pages/statistic/Center';
import FailedManufacturefactory from '../pages/statistic/FailedManufacturefactory';
import FailedProductLine from '../pages/statistic/FailedProductLine';
import FailedStatistic from '../pages/statistic/FailedStatistic';
import ManufactureFactory from '../pages/statistic/ManufactureFactory';
import ProductStatistic from '../pages/statistic/ProductStatistic';
import Sale from '../pages/statistic/Sale';
import SoldStatistic from '../pages/statistic/SoldStatistic';
import Statistic from '../pages/statistic/Statistic';
import Status from '../pages/statistic/Status';
import User from '../pages/user/User';

const publicRoutes = [
  { path: '/profile', component: <Profile /> },
  { path: '/home', component: <Home /> },
  { path: '/product/:id', component: <Product /> },
  { path: '/produce', component: <Produce /> },
  { path: '/request', component: <Request /> },
  { path: '/productline', component: <ProductLine /> },
  { path: '/productline/:id', component: <ProductLineInfo /> },
  { path: '/productline/:id/edit', component: <ProductLineUpdate /> },
  { path: '/productline/create', component: <ProductLineAdd /> },
  { path: '/statistic', component: <Statistic /> },
  { path: '/statistic/status', component: <Status /> },
  { path: '/statistic/manufacture_factory', component: <ManufactureFactory /> },
  { path: '/statistic/sale', component: <Sale /> },
  { path: '/statistic/center', component: <Center /> },
  { path: '/statistic/product_statistic', component: <ProductStatistic /> },
  { path: '/statistic/sold_statistic', component: <SoldStatistic /> },
  { path: '/statistic/failed_statistic', component: <FailedStatistic /> },
  {
    path: '/statistic/failed_manufacture_factory',
    component: <FailedManufacturefactory />,
  },
  { path: '/statistic/failed_productline', component: <FailedProductLine /> },
  { path: '/user', component: <User /> },
  { path: '/import/productline', component: <Import /> },
  { path: '/import/productline/:id', component: <ImportDetail /> },
  { path: '/import/productline/:id/factory', component: <Factory /> },
];

export { publicRoutes };
