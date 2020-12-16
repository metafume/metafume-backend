const ROUTE = {
  PRODUCTS: {
    INDEX: '/products',
    SEARCH: '/search',
    DETAIL: '/detail',
    RECENT: '/recent',
    RECOMMENDATION: '/recommendation/:user_id',
  },
  USERS: {
    INDEX: '/users',
    LOGIN: {
      GOOGLE: '/login/google',
      TOKEN: '/login/token',
    },
    FAVORITE: {
      ADD: '/:user_id/favorite/:product_id',
      DELETE: '/:user_id/favorite/:product_id',
    },
    SUBSCRIPTION: '/:user_id/subscription',
  },
  HEALTH: '/heath',
};

module.exports = {
  ROUTE,
};
