// 管理员菜单栏
const managerMenuList = [
  {
    label: '首页',
    key: '1',
    path: '/home',
  },
  {
    label: '用户管理',
    key: '2',
    path: '/user-management',
    child: [
      {
        label: '房东列表',
        key: '2-1',
        path: '/user-management/owner-list',
      },
      {
        label: '租户列表',
        key: '2-2',
        path: '/user-management/tenant-list',
      },
      {
        label: '管理员列表',
        key: '2-3',
        path: '/user-management/manager-list',
      },
    ],
  },
  {
    label: '房屋管理',
    key: '3',
    path: '/house-management',
    child: [
      {
        label: '房屋列表',
        key: '3-1',
        path: '/house-management/house-list',
      },
    ],
  },
  {
    label: '新闻管理',
    key: '4',
    path: '/news-management',
    child: [
      {
        label: '新闻列表',
        key: '4-1',
        path: '/news-management/news-list',
      },
    ],
  },
  {
    label: '故障管理',
    key: '5',
    path: '/trouble-management',
    child: [
      {
        label: '故障列表',
        key: '5-1',
        path: '/trouble-management/trouble-list',
      },
    ],
  },
  {
    label: '订单管理',
    key: '6',
    path: '/order-management',
    child: [
      {
        label: '订单列表',
        key: '6-1',
        path: '/order-management/order-list',
      },
    ],
  },
];
// 房东菜单栏
const ownerMenuList = [
  {
    label: '首页',
    key: '1',
    path: '/home',
  },
  // {
  //   label: '用户管理',
  //   key: '2',
  //   path: '/user-management',
  //   child: [
  //     {
  //       label: '房东列表',
  //       key: '2-1',
  //       path: '/user-management/owner-list',
  //     },
  //     {
  //       label: '租户列表',
  //       key: '2-2',
  //       path: '/user-management/tenant-list',
  //     },
  //     {
  //       label: '管理员列表',
  //       key: '2-3',
  //       path: '/user-management/manager-list',
  //     },
  //   ],
  // },
  {
    label: '房屋管理',
    key: '3',
    path: '/house-management',
    child: [
      {
        label: '房屋列表',
        key: '3-1',
        path: '/house-management/house-list',
      },
    ],
  },
  {
    label: '新闻管理',
    key: '4',
    path: '/news-management',
    child: [
      {
        label: '新闻列表',
        key: '4-1',
        path: '/news-management/news-list',
      },
    ],
  },
  {
    label: '故障管理',
    key: '5',
    path: '/trouble-management',
    child: [
      {
        label: '故障列表',
        key: '5-1',
        path: '/trouble-management/trouble-list',
      },
    ],
  },
  {
    label: '订单管理',
    key: '6',
    path: '/order-management',
    child: [
      {
        label: '订单列表',
        key: '6-1',
        path: '/order-management/order-list',
      },
    ],
  },
];
// 租户菜单栏
const tenantMenuList = [
  {
    label: '首页',
    key: '1',
    path: '/home',
  },
  // {
  //   label: '用户管理',
  //   key: '2',
  //   path: '/user-management',
  //   child: [
  //     {
  //       label: '房东列表',
  //       key: '2-1',
  //       path: '/user-management/owner-list',
  //     },
  //     {
  //       label: '租户列表',
  //       key: '2-2',
  //       path: '/user-management/tenant-list',
  //     },
  //     {
  //       label: '管理员列表',
  //       key: '2-3',
  //       path: '/user-management/manager-list',
  //     },
  //   ],
  // },
  {
    label: '房屋管理',
    key: '3',
    path: '/house-management',
    child: [
      {
        label: '房屋列表',
        key: '3-1',
        path: '/house-management/house-list',
      },
    ],
  },
  {
    label: '新闻管理',
    key: '4',
    path: '/news-management',
    child: [
      {
        label: '新闻列表',
        key: '4-1',
        path: '/news-management/news-list',
      },
    ],
  },
  {
    label: '故障管理',
    key: '5',
    path: '/trouble-management',
    child: [
      {
        label: '故障列表',
        key: '5-1',
        path: '/trouble-management/trouble-list',
      },
    ],
  },
  // {
  //   label: '订单管理',
  //   key: '6',
  //   path: '/order-management',
  //   child: [
  //     {
  //       label: '订单列表',
  //       key: '6-1',
  //       path: '/order-management/order-list',
  //     },
  //   ],
  // },
];

module.exports = {
  managerMenuList,
  tenantMenuList,
  ownerMenuList,
};
