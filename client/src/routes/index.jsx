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
  { path: '/profile', component: <Profile role={[1, 2, 3, 4]} /> },
  { path: '/home', component: <Home role={[2, 3, 4]} /> },
  {
    path: '/product/:id',
    component: <Product role={[2, 3, 4]} />,
  },
  { path: '/produce', component: <Produce role={[2]} /> },
  {
    path: '/request',
    component: <Request role={[2, 3, 4]} />,
  },
  { path: '/productline', component: <ProductLine role={[1]} /> },
  { path: '/productline/:id', component: <ProductLineInfo role={[1]} /> },
  {
    path: '/productline/:id/edit',
    component: <ProductLineUpdate role={[1]} />,
  },
  { path: '/productline/create', component: <ProductLineAdd role={[1]} /> },
  { path: '/statistic', component: <Statistic role={[1]} /> },
  { path: '/statistic/status', component: <Status role={[1]} /> },
  {
    path: '/statistic/manufacture_factory',
    component: <ManufactureFactory role={[1]} />,
  },
  { path: '/statistic/sale', component: <Sale role={[1]} /> },
  { path: '/statistic/center', component: <Center role={[1]} /> },
  {
    path: '/statistic/product_statistic',
    component: <ProductStatistic role={[2, 3, 4]} />,
  },
  {
    path: '/statistic/sold_statistic',
    component: <SoldStatistic role={[2, 3]} />,
  },
  {
    path: '/statistic/failed_statistic',
    component: <FailedStatistic role={[2]} />,
  },
  {
    path: '/statistic/failed_manufacture_factory',
    component: <FailedManufacturefactory role={[2]} />,
  },
  {
    path: '/statistic/failed_productline',
    component: <FailedProductLine role={[2]} />,
  },
  { path: '/user', component: <User role={[1]} /> },
  { path: '/import/productline', component: <Import role={[3]} /> },
  { path: '/import/productline/:id', component: <ImportDetail role={[3]} /> },
  {
    path: '/import/productline/:id/factory',
    component: <Factory role={[3]} />,
  },
];

export { publicRoutes };
