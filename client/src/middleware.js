const middleware = [
  {
    role: 1,
    path: [
      '/productline',
      '/productline/:id',
      '/productline/:id/edit',
      '/productline/create',
      '/user',
      '/profile',
      '/statistic',
      '/statistic/status',
      '/statistic/sale',
      '/statistic/center',
      '/statistic/manufacture_factory',
    ],
  },
  {
    role: 2,
    path: [
      '/home',
      '/request',
      '/profile',
      '/produce',
      '/product/:id',
      '/statistic/failed_productline',
      '/statistic/failed_statistic',
      '/statistic/failed_manufacture_factory',
      '/statistic/product_statistic',
      '/statistic/sold_statistic',
    ],
  },
  {
    role: 3,
    path: [
      '/home',
      '/request',
      '/profile',
      '/import/productline',
      '/import/productline/:id',
      '/import/productline/:id/factory',
      '/statistic/product_statistic',
      '/statistic/sold_statistic',
    ],
  },
  {
    role: 4,
    path: ['/home', '/request', '/profile', '/statistic/product_statistic'],
  },
];

export { middleware };
